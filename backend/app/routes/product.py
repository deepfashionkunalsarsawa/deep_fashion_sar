
from fastapi import APIRouter, Depends, UploadFile, File, Form, HTTPException
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models.product import Product
from app.models.product_image import ProductImage
from app.schemas.product import ProductSchema
from app.utils.security import get_current_admin
from app.utils.supabase_client import supabase
from typing import List, Optional
import uuid
import os
from dotenv import load_dotenv

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
ADMIN_SECRET_PATH = os.getenv("ADMIN_SECRET_PATH")

if not SUPABASE_URL:
    raise ValueError("SUPABASE_URL is not set")

if not ADMIN_SECRET_PATH:
    raise ValueError("ADMIN_SECRET_PATH is not set")

router = APIRouter()


# ================= DB SESSION =================
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ================= ADD PRODUCT =================
@router.post(f"/{ADMIN_SECRET_PATH}/add-product")
async def add_product(
    name: str = Form(...),
    description: str = Form(None),
    price: float = Form(...),
    category: str = Form(None),
    occasion: str = Form(None),
    fabric: str = Form(None),
    care_instruction: str = Form(None),
    stock: int = Form(0),
    is_featured: bool = Form(False),
    images: List[UploadFile] = File(...),
    db: Session = Depends(get_db),
    admin=Depends(get_current_admin),
):
    product = Product(
        name=name,
        description=description,
        price=price,
        category=category,
        occasion=occasion,
        fabric=fabric,
        care_instruction=care_instruction,
        stock=stock,
        is_featured=is_featured,
    )

    db.add(product)
    db.commit()
    db.refresh(product)

    allowed_extensions = {"jpg", "jpeg", "png", "webp"}

    for image in images:
        file_ext = image.filename.split(".")[-1].lower()

        if file_ext not in allowed_extensions:
            raise HTTPException(status_code=400, detail="Invalid image format")

        file_bytes = await image.read()

        if len(file_bytes) > 5 * 1024 * 1024:
            raise HTTPException(status_code=400, detail="Image too large")

        unique_filename = f"{uuid.uuid4()}.{file_ext}"

        supabase.storage.from_("product-images").upload(
            unique_filename,
            file_bytes,
            {"content-type": image.content_type}
        )

        image_url = f"{SUPABASE_URL}/storage/v1/object/public/product-images/{unique_filename}"

        db.add(ProductImage(product_id=product.id, image_url=image_url))

    db.commit()

    return {"message": "Product created successfully"}


# ================= GET PRODUCTS =================
@router.get("/products", response_model=List[ProductSchema])
def get_products(db: Session = Depends(get_db)):
    return db.query(Product).all()


@router.get("/products/{id}", response_model=ProductSchema)
def get_product_by_id(id: int, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == id).first()

    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    return product


# ================= UPDATE PRODUCT =================
@router.put(f"/{ADMIN_SECRET_PATH}/update-product/{{id}}")
async def update_product(
    id: int,
    name: str = Form(...),
    description: str = Form(None),
    price: float = Form(...),
    category: str = Form(None),
    occasion: str = Form(None),
    fabric: str = Form(None),
    care_instruction: str = Form(None),
    stock: int = Form(0),
    is_featured: bool = Form(False),
    images: Optional[List[UploadFile]] = File(None),
    db: Session = Depends(get_db),
    admin=Depends(get_current_admin),
):
    product = db.query(Product).filter(Product.id == id).first()

    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    # Update fields
    product.name = name
    product.description = description
    product.price = price
    product.category = category
    product.occasion = occasion
    product.fabric = fabric
    product.care_instruction = care_instruction
    product.stock = stock
    product.is_featured = is_featured

    # Upload new images (without deleting old ones)
    if images:
        allowed_extensions = {"jpg", "jpeg", "png", "webp"}

        for image in images:
            file_ext = image.filename.split(".")[-1].lower()

            if file_ext not in allowed_extensions:
                raise HTTPException(status_code=400, detail="Invalid image format")

            file_bytes = await image.read()

            if len(file_bytes) > 5 * 1024 * 1024:
                raise HTTPException(status_code=400, detail="Image too large")

            unique_filename = f"{uuid.uuid4()}.{file_ext}"

            supabase.storage.from_("product-images").upload(
                unique_filename,
                file_bytes,
                {"content-type": image.content_type}
            )

            image_url = f"{SUPABASE_URL}/storage/v1/object/public/product-images/{unique_filename}"

            db.add(ProductImage(product_id=product.id, image_url=image_url))

    db.commit()
    db.refresh(product)

    return {"message": "Product updated successfully"}


# ================= DELETE SINGLE IMAGE =================
@router.delete(f"/{ADMIN_SECRET_PATH}/delete-product-image/{{image_id}}")
def delete_product_image(
    image_id: int,
    db: Session = Depends(get_db),
    admin=Depends(get_current_admin),
):
    image = db.query(ProductImage).filter(ProductImage.id == image_id).first()

    if not image:
        raise HTTPException(status_code=404, detail="Image not found")

    filename = image.image_url.split("/")[-1]
    supabase.storage.from_("product-images").remove([filename])

    db.delete(image)
    db.commit()

    return {"message": "Image deleted successfully"}


# ================= DELETE PRODUCT =================
@router.delete(f"/{ADMIN_SECRET_PATH}/delete-product/{{id}}")
def delete_product(
    id: int,
    db: Session = Depends(get_db),
    admin=Depends(get_current_admin),
):
    product = db.query(Product).filter(Product.id == id).first()

    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    for img in product.images:
        filename = img.image_url.split("/")[-1]
        supabase.storage.from_("product-images").remove([filename])

    db.delete(product)
    db.commit()

    return {"message": "Product deleted successfully"}