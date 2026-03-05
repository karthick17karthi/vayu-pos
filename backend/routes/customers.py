from datetime import datetime
from enum import Enum
from pathlib import Path
from typing import Annotated
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Response, status
from pydantic import BaseModel, ConfigDict

from services.customer_service import (
    CustomerNotFoundError,
    CustomerService,
    CustomerServiceError,
)


router = APIRouter()

BASE_DIR = Path(__file__).resolve().parents[1]
CUSTOMERS_STORAGE_PATH = BASE_DIR / "storage" / "customers.json"


class CustomerStatus(str, Enum):
    pending = "Pending"
    verified = "Verified"
    rejected = "Rejected"


class CustomerBase(BaseModel):
    hotel_name: str
    owner_name: str
    mobile: str
    email: str

    hotel_door_no: str
    hotel_street: str
    hotel_area: str
    hotel_city: str
    hotel_district: str
    hotel_state: str
    hotel_pincode: str

    owner_door_no: str
    owner_street: str
    owner_area: str
    owner_city: str
    owner_district: str
    owner_state: str
    owner_pincode: str

    gst_number: str
    pan_number: str
    hotel_license_number: str
    extra_license: str
    aadhar_number: str | None = None


class CustomerCreate(CustomerBase):
    pass


class CustomerUpdate(CustomerBase):
    pass


class CustomerRead(CustomerBase):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    status: CustomerStatus
    created_at: datetime


def get_customer_service() -> CustomerService:
    return CustomerService(storage_path=CUSTOMERS_STORAGE_PATH)


@router.get("", response_model=list[CustomerRead], status_code=status.HTTP_200_OK)
async def list_customers(
    service: Annotated[CustomerService, Depends(get_customer_service)],
) -> list[CustomerRead]:
    try:
        customers = await service.list_customers()
        return [CustomerRead.model_validate(customer) for customer in customers]
    except CustomerServiceError as exc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(exc),
        ) from exc


@router.post("", response_model=CustomerRead, status_code=status.HTTP_201_CREATED)
async def create_customer(
    payload: CustomerCreate,
    service: Annotated[CustomerService, Depends(get_customer_service)],
) -> CustomerRead:
    try:
        created = await service.create_customer(payload.model_dump())
        return CustomerRead.model_validate(created)
    except CustomerServiceError as exc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(exc),
        ) from exc


@router.put("/{id}", response_model=CustomerRead, status_code=status.HTTP_200_OK)
async def update_customer(
    id: UUID,
    payload: CustomerUpdate,
    service: Annotated[CustomerService, Depends(get_customer_service)],
) -> CustomerRead:
    try:
        updated = await service.update_customer(str(id), payload.model_dump())
        return CustomerRead.model_validate(updated)
    except CustomerNotFoundError as exc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(exc),
        ) from exc
    except CustomerServiceError as exc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(exc),
        ) from exc


@router.patch("/{id}/verify", response_model=CustomerRead, status_code=status.HTTP_200_OK)
async def verify_customer(
    id: UUID,
    service: Annotated[CustomerService, Depends(get_customer_service)],
) -> CustomerRead:
    try:
        updated = await service.set_customer_status(str(id), CustomerStatus.verified.value)
        return CustomerRead.model_validate(updated)
    except CustomerNotFoundError as exc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(exc),
        ) from exc
    except CustomerServiceError as exc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(exc),
        ) from exc


@router.patch("/{id}/reject", response_model=CustomerRead, status_code=status.HTTP_200_OK)
async def reject_customer(
    id: UUID,
    service: Annotated[CustomerService, Depends(get_customer_service)],
) -> CustomerRead:
    try:
        updated = await service.set_customer_status(str(id), CustomerStatus.rejected.value)
        return CustomerRead.model_validate(updated)
    except CustomerNotFoundError as exc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(exc),
        ) from exc
    except CustomerServiceError as exc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(exc),
        ) from exc


@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_customer(
    id: UUID,
    service: Annotated[CustomerService, Depends(get_customer_service)],
) -> Response:
    try:
        await service.delete_customer(str(id))
        return Response(status_code=status.HTTP_204_NO_CONTENT)
    except CustomerNotFoundError as exc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(exc),
        ) from exc
    except CustomerServiceError as exc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(exc),
        ) from exc
