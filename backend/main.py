from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.customers import router as customers_router
from routes.demo import router as demo_router
from routes.landing import router as landing_router


BASE_DIR = Path(__file__).resolve().parent


app = FastAPI(title="Vayu CMS Backend", version="1.0.0")


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001", "http://localhost:5173", "http://localhost:5174"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(landing_router, prefix="/api")
app.include_router(demo_router, prefix="/api")
app.include_router(customers_router, prefix="/api/customers", tags=["Customers"])


@app.get("/health", tags=["Health"])
async def health_check() -> dict[str, str]:
    return {"status": "ok"}
