from fastapi import APIRouter, Depends, HTTPException, Request
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from slowapi import Limiter
from slowapi.util import get_remote_address
from app.database import SessionLocal
from app.models.admin import Admin
from app.utils.security import verify_password, create_access_token
#>>>>>>>>>>>>>>>
import os
from dotenv import load_dotenv

load_dotenv()
ADMIN_SECRET_PATH = os.getenv("ADMIN_SECRET_PATH")
if not ADMIN_SECRET_PATH:
    raise ValueError("ADMIN_SECRET_PATH is not set")
#>>>>>>>>>>>>>>>

limiter = Limiter(key_func=get_remote_address)

router = APIRouter(prefix=f"/{ADMIN_SECRET_PATH}", tags=["Admin"])


# 🔹 Database Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()



@router.post("/login")

@limiter.limit("5/5minutes")
def login(
    request: Request,
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db),
):
    admin = db.query(Admin).filter(Admin.email == form_data.username).first()

    # if not admin:
    #     raise HTTPException(status_code=400, detail="Invalid email")

    # if not verify_password(form_data.password, admin.hashed_password):
    #     raise HTTPException(status_code=400, detail="Invalid password")
    
    if not admin or not verify_password(form_data.password, admin.hashed_password):
        raise HTTPException(status_code=400, detail="Invalid credentials")    

    token = create_access_token({"sub": admin.email})

    return {
        "access_token": token,
        "token_type": "bearer"
    }