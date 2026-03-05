from pathlib import Path
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status

from models.demo_schema import DemoRequest, DemoRequestCreate
from services.demo_service import DemoService, DemoServiceError


router = APIRouter(prefix="/demo-request", tags=["Demo Requests"])

BASE_DIR = Path(__file__).resolve().parents[1]
DEMO_STORAGE_PATH = BASE_DIR / "storage" / "demo_requests.json"


def get_demo_service() -> DemoService:
    return DemoService(storage_path=DEMO_STORAGE_PATH)


@router.get("", response_model=list[DemoRequest], status_code=status.HTTP_200_OK)
async def list_demo_requests(
    service: Annotated[DemoService, Depends(get_demo_service)]
) -> list[DemoRequest]:
    try:
        return await service.list_demo_requests()
    except DemoServiceError as exc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(exc),
        ) from exc


@router.post("", response_model=DemoRequest, status_code=status.HTTP_201_CREATED)
async def create_demo_request(
    payload: DemoRequestCreate,
    service: Annotated[DemoService, Depends(get_demo_service)],
) -> DemoRequest:
    try:
        return await service.create_demo_request(payload)
    except DemoServiceError as exc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(exc),
        ) from exc
