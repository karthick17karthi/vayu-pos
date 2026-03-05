# FastAPI CMS Backend - Quick Start

## Setup

1. **Create virtual environment (recommended)**
   ```powershell
   cd backend
   python -m venv venv
   .\venv\Scripts\Activate.ps1
   ```

2. **Install dependencies**
   ```powershell
   pip install -r requirements.txt
   ```

3. **Run the server**
   ```powershell
   uvicorn main:app --reload --port 8000
   ```

   Server will start at: `http://localhost:8000`

4. **API Endpoints**
   - Health check: `GET http://localhost:8000/health`
   - Get landing content: `GET http://localhost:8000/api/landing`
   - Update landing content: `PUT http://localhost:8000/api/landing`
   - Interactive docs: `http://localhost:8000/docs`

## Storage

Landing page data is stored in `storage/landing.json`. 
- File is auto-created with default content on first request if missing
- Updates via PUT endpoint are persisted immediately

## Project Structure

```
backend/
├── main.py                      # FastAPI app, CORS, router setup
├── routes/
│   └── landing.py              # GET/PUT endpoints for /api/landing
├── services/
│   └── landing_service.py      # Business logic, JSON file handling
├── models/
│   └── landing_schema.py       # Pydantic schemas for validation
└── storage/
    └── landing.json            # Persistent data store
```

## Development

- All endpoints are async
- Validation errors return 422 automatically
- Service errors return 500 with error details
- CORS enabled for:
  - http://localhost:3000
  - http://localhost:5173

## Future Migration

The service layer is isolated—swapping to PostgreSQL only requires updating `landing_service.py` without touching routes or schemas.
