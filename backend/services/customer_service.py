from __future__ import annotations

import asyncio
import json
from datetime import datetime, timezone
from pathlib import Path
from uuid import uuid4


DEFAULT_CUSTOMERS: list[dict] = []


class CustomerServiceError(Exception):
    pass


class CustomerNotFoundError(CustomerServiceError):
    pass


class CustomerService:
    def __init__(self, storage_path: Path) -> None:
        self.storage_path = storage_path
        self.storage_path.parent.mkdir(parents=True, exist_ok=True)

    async def list_customers(self) -> list[dict]:
        data = await self._load_customers()
        return data

    async def create_customer(self, payload: dict) -> dict:
        data = await self._load_customers()

        customer = {
            **payload,
            "id": str(uuid4()),
            "status": "Pending",
            "created_at": datetime.now(timezone.utc).isoformat(),
        }

        data.append(customer)
        await self._save_customers(data)
        return customer

    async def update_customer(self, customer_id: str, payload: dict) -> dict:
        data = await self._load_customers()

        for index, customer in enumerate(data):
            if customer.get("id") == customer_id:
                updated_customer = {
                    **payload,
                    "id": customer["id"],
                    "status": customer.get("status", "Pending"),
                    "created_at": customer.get("created_at"),
                }
                data[index] = updated_customer
                await self._save_customers(data)
                return updated_customer

        raise CustomerNotFoundError("Customer not found")

    async def set_customer_status(self, customer_id: str, status: str) -> dict:
        data = await self._load_customers()

        for index, customer in enumerate(data):
            if customer.get("id") == customer_id:
                customer["status"] = status
                data[index] = customer
                await self._save_customers(data)
                return customer

        raise CustomerNotFoundError("Customer not found")

    async def delete_customer(self, customer_id: str) -> None:
        data = await self._load_customers()

        for index, customer in enumerate(data):
            if customer.get("id") == customer_id:
                data.pop(index)
                await self._save_customers(data)
                return

        raise CustomerNotFoundError("Customer not found")

    async def _load_customers(self) -> list[dict]:
        await self._ensure_storage_exists()

        try:
            payload = await asyncio.to_thread(self._read_json_sync)
        except json.JSONDecodeError as exc:
            raise CustomerServiceError("Customer data file contains invalid JSON") from exc
        except OSError as exc:
            raise CustomerServiceError("Unable to read customer data file") from exc

        if not isinstance(payload, list):
            raise CustomerServiceError("Customer data must be a JSON array")

        return payload

    async def _save_customers(self, data: list[dict]) -> None:
        try:
            await asyncio.to_thread(self._write_json_sync, data)
        except OSError as exc:
            raise CustomerServiceError("Unable to write customer data file") from exc

    async def _ensure_storage_exists(self) -> None:
        if not self.storage_path.exists():
            await asyncio.to_thread(self._write_json_sync, DEFAULT_CUSTOMERS)

    def _read_json_sync(self) -> list[dict]:
        with self.storage_path.open("r", encoding="utf-8") as file_obj:
            return json.load(file_obj)

    def _write_json_sync(self, data: list[dict]) -> None:
        with self.storage_path.open("w", encoding="utf-8") as file_obj:
            json.dump(data, file_obj, ensure_ascii=False, indent=2)
