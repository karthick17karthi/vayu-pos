from datetime import datetime

from pydantic import BaseModel, EmailStr, Field


class DemoRequestCreate(BaseModel):
    ownerName: str = Field(..., min_length=1)
    hotelName: str = Field(..., min_length=1)
    licenseNumber: str = Field(..., min_length=1)
    phone: str = Field(..., min_length=1)
    email: EmailStr
    city: str = Field(..., min_length=1)
    branches: int = Field(..., ge=0)
    message: str = Field(default="")
    extraFields: dict[str, str] | None = None


class DemoRequest(DemoRequestCreate):
    created_at: datetime
