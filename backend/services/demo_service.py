from __future__ import annotations

import asyncio
import json
from datetime import datetime, timezone
from pathlib import Path

from models.demo_schema import DemoRequest, DemoRequestCreate


DEFAULT_DEMO_REQUESTS: list[dict] = []


class DemoServiceError(Exception):
    pass


class DemoService:
    def __init__(self, storage_path: Path) -> None:
        self.storage_path = storage_path
        self.storage_path.parent.mkdir(parents=True, exist_ok=True)

    async def list_demo_requests(self) -> list[DemoRequest]:
        await self._ensure_storage_exists()

        try:
            payload = await asyncio.to_thread(self._read_json_sync)
            return [DemoRequest.model_validate(item) for item in payload]
        except json.JSONDecodeError as exc:
            raise DemoServiceError("Demo request data file contains invalid JSON") from exc
        except OSError as exc:
            raise DemoServiceError("Unable to read demo request data file") from exc
        except ValueError as exc:
            raise DemoServiceError("Demo request data does not match expected schema") from exc

    async def create_demo_request(self, payload: DemoRequestCreate) -> DemoRequest:
        await self._ensure_storage_exists()

        try:
            data = await asyncio.to_thread(self._read_json_sync)
            new_request = DemoRequest(
                **payload.model_dump(),
                created_at=datetime.now(timezone.utc),
            )
            data.append(new_request.model_dump(mode="json"))
            await asyncio.to_thread(self._write_json_sync, data)
            return new_request
        except json.JSONDecodeError as exc:
            raise DemoServiceError("Demo request data file contains invalid JSON") from exc
        except OSError as exc:
            raise DemoServiceError("Unable to write demo request data file") from exc

    async def _ensure_storage_exists(self) -> None:
        if not self.storage_path.exists():
            await asyncio.to_thread(self._write_json_sync, DEFAULT_DEMO_REQUESTS)

    def _read_json_sync(self) -> list[dict]:
        with self.storage_path.open("r", encoding="utf-8") as file_obj:
            return json.load(file_obj)

    def _write_json_sync(self, data: list[dict]) -> None:
        with self.storage_path.open("w", encoding="utf-8") as file_obj:
            json.dump(data, file_obj, ensure_ascii=False, indent=2)
