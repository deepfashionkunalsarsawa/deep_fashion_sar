from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.product import router as product_router
from app.database import engine, Base
from app.models import product, product_image
from app.routes.admin import router as admin_router
from app.models import admin
from slowapi import Limiter
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from slowapi.middleware import SlowAPIMiddleware
from fastapi.responses import JSONResponse


Base.metadata.create_all(bind=engine)

app = FastAPI()
limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter
app.add_middleware(SlowAPIMiddleware)

@app.exception_handler(RateLimitExceeded)
def rate_limit_handler(request, exc):
    return JSONResponse(
        status_code=429,
        content={"detail": "Too many login attempts. Try again later."},
    )

# Allow frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174"
    ],

    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(product_router)
app.include_router(admin_router)



@app.get("/")
def root():
    return {"message": "Deep Fashion Backend Running"}
