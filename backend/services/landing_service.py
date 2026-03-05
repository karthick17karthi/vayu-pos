from __future__ import annotations

import asyncio
import json
from pathlib import Path

from models.landing_schema import LandingPageContent


DEFAULT_LANDING_CONTENT = {
    "hero": {
        "title": "Vayu POS - Smart Restaurant Billing Solution",
        "subtitle": "Streamline your restaurant operations",
        "requestBtn": "Request Demo",
        "pricingBtn": "View Pricing",
    },
    "features": [
        {
            "id": 1,
            "title": "Billing",
            "description": "Process orders instantly",
            "active": True,
        }
    ],
    "pricing": [
        {
            "id": 1,
            "name": "Basic",
            "price": 5999,
            "popular": False,
            "features": ["1 Branch", "Basic Billing"],
        }
    ],
    "demoForm": {
        "title": "Request Your Free Demo",
        "subtitle": "See Vayu POS in action. Fill out the form below and our team will get in touch with you shortly.",
        "submitText": "Request Demo",
        "fields": [
            {
                "key": "ownerName",
                "label": "Owner Name",
                "placeholder": "Enter your full name",
                "type": "text",
                "required": True,
            },
            {
                "key": "hotelName",
                "label": "Hotel Name",
                "placeholder": "Enter your restaurant/hotel name",
                "type": "text",
                "required": True,
            },
            {
                "key": "licenseNumber",
                "label": "Hotel License Number",
                "placeholder": "Enter license number",
                "type": "text",
                "required": True,
            },
            {
                "key": "phone",
                "label": "Phone Number",
                "placeholder": "Enter phone number",
                "type": "tel",
                "required": True,
            },
            {
                "key": "email",
                "label": "Email Address",
                "placeholder": "Enter your email",
                "type": "email",
                "required": True,
            },
            {
                "key": "city",
                "label": "City",
                "placeholder": "Enter your city",
                "type": "text",
                "required": True,
            },
            {
                "key": "branches",
                "label": "Number of Branches",
                "placeholder": "How many branches do you have?",
                "type": "number",
                "required": True,
            },
            {
                "key": "message",
                "label": "Additional Message (Optional)",
                "placeholder": "Tell us more about your requirements...",
                "type": "textarea",
                "required": False,
            },
        ],
    },
}


class LandingServiceError(Exception):
    pass


class LandingService:
    def __init__(self, storage_path: Path) -> None:
        self.storage_path = storage_path
        self.storage_path.parent.mkdir(parents=True, exist_ok=True)

    async def get_landing_content(self) -> LandingPageContent:
        await self._ensure_storage_exists()

        try:
            payload = await asyncio.to_thread(self._read_json_sync)
            return LandingPageContent.model_validate(payload)
        except json.JSONDecodeError as exc:
            raise LandingServiceError("Landing data file contains invalid JSON") from exc
        except OSError as exc:
            raise LandingServiceError("Unable to read landing data file") from exc
        except ValueError as exc:
            raise LandingServiceError("Landing data does not match expected schema") from exc

    async def update_landing_content(
        self, content: LandingPageContent
    ) -> LandingPageContent:
        await self._ensure_storage_exists()

        try:
            data = content.model_dump(mode="json")
            await asyncio.to_thread(self._write_json_sync, data)
            return content
        except OSError as exc:
            raise LandingServiceError("Unable to write landing data file") from exc

    async def _ensure_storage_exists(self) -> None:
        if not self.storage_path.exists():
            await asyncio.to_thread(self._write_json_sync, DEFAULT_LANDING_CONTENT)

    def _read_json_sync(self) -> dict:
        with self.storage_path.open("r", encoding="utf-8") as file_obj:
            return json.load(file_obj)

    def _write_json_sync(self, data: dict) -> None:
        with self.storage_path.open("w", encoding="utf-8") as file_obj:
            json.dump(data, file_obj, ensure_ascii=False, indent=2)
