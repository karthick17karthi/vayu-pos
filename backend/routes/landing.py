from typing import Annotated
from pathlib import Path

from fastapi import APIRouter, Depends, HTTPException, status

from models.landing_schema import LandingPageContent
from services.landing_service import LandingService, LandingServiceError


router = APIRouter(prefix="/landing", tags=["Landing"])

BASE_DIR = Path(__file__).resolve().parents[1]
LANDING_STORAGE_PATH = BASE_DIR / "storage" / "landing.json"


def get_landing_service() -> LandingService:
    return LandingService(storage_path=LANDING_STORAGE_PATH)


@router.get("", response_model=LandingPageContent, status_code=status.HTTP_200_OK)
async def get_landing(
    service: Annotated[LandingService, Depends(get_landing_service)]
) -> LandingPageContent:
    try:
        return await service.get_landing_content()
    except LandingServiceError as exc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(exc),
        ) from exc


@router.put("", response_model=LandingPageContent, status_code=status.HTTP_200_OK)
async def update_landing(
    payload: LandingPageContent,
    service: Annotated[LandingService, Depends(get_landing_service)],
) -> LandingPageContent:
    try:
        return await service.update_landing_content(payload)
    except LandingServiceError as exc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(exc),
        ) from exc
