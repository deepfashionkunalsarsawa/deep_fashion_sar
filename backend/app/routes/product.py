from fastapi import APIRouter, Depends, UploadFile, File, Form
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models.product import Product
from app.models.product_image import ProductImage
from app.schemas.product import ProductSchema
from app.utils.security import get_current_admin
from fastapi import HTTPException
from app.utils.supabase_client import supabase
import uuid

import shutil
import os
from dotenv import load_dotenv

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")

if not SUPABASE_URL:
    raise ValueError("SUPABASE_URL is not set")

ADMIN_SECRET_PATH = os.getenv("ADMIN_SECRET_PATH")
if not ADMIN_SECRET_PATH:
    raise ValueError("ADMIN_SECRET_PATH is not set")

router = APIRouter()



def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


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
    image: UploadFile = File(...),
    db: Session = Depends(get_db),
    admin = Depends(get_current_admin)
):

    
    # file_path = os.path.join(UPLOAD_FOLDER, image.filename)

    # with open(file_path, "wb") as buffer:
    #     shutil.copyfileobj(image.file, buffer)

    # image_url = f"http://localhost:8000/public/{image.filename}"



    # Generate unique filename
    # file_ext = image.filename.split(".")[-1]
    # unique_filename = f"{uuid.uuid4()}.{file_ext}"

    # file_bytes = await image.read()


    # ✅ Validate image extension
    # allowed_extensions = {"jpg", "jpeg", "png", "webp"}

    # file_ext = image.filename.split(".")[-1].lower()

    # if file_ext not in allowed_extensions:
    #     raise HTTPException(status_code=400, detail="Invalid image format")

    # # ✅ Read file and validate size
    # file_bytes = await image.read()

    # if len(file_bytes) > 5 * 1024 * 1024:  # 5MB limit
    #     raise HTTPException(status_code=400, detail="Image too large")


    # # Upload to Supabase Storage
    # supabase.storage.from_("product-images").upload(
    #     unique_filename,
    #     file_bytes
    # )

    # # Get public URL
    # image_url = f"{os.getenv('SUPABASE_URL')}/storage/v1/object/public/product-images/{unique_filename}"


    # ✅ Validate image extension
    allowed_extensions = {"jpg", "jpeg", "png", "webp"}

    file_ext = image.filename.split(".")[-1].lower()

    if file_ext not in allowed_extensions:
        raise HTTPException(status_code=400, detail="Invalid image format")

    # ✅ Read file and validate size
    file_bytes = await image.read()

    if len(file_bytes) > 5 * 1024 * 1024:
        raise HTTPException(status_code=400, detail="Image too large")

    # ✅ Generate unique filename AFTER validation
    unique_filename = f"{uuid.uuid4()}.{file_ext}"

    # ✅ Upload to Supabase
    supabase.storage.from_("product-images").upload(
        unique_filename,
        file_bytes
    )

    # ✅ Generate public URL
    image_url = f"{SUPABASE_URL}/storage/v1/object/public/product-images/{unique_filename}"



    # Create product
    product = Product(
        name=name,
        description=description,
        price=price,
        category=category,
        occasion=occasion,
        fabric=fabric,
        care_instruction=care_instruction,
        stock=stock,
        is_featured=is_featured
    )

    db.add(product)
    db.commit()
    db.refresh(product)

    # Save image reference
    product_image = ProductImage(
        product_id=product.id,
        image_url=image_url
    )

    db.add(product_image)
    db.commit()

    return {"message": "Product created successfully"}


# 🔹 GET ALL PRODUCTS
@router.get("/products", response_model=list[ProductSchema])
def get_products(db: Session = Depends(get_db)):
    return db.query(Product).all()
@router.get("/products/{id}", response_model=ProductSchema)
def get_product_by_id(id: int, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == id).first()

    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    return product


@router.delete(f"/{ADMIN_SECRET_PATH}/delete-product/{{id}}")
def delete_product(
    id: int,
    db: Session = Depends(get_db),
    admin = Depends(get_current_admin)
):
    product = db.query(Product).filter(Product.id == id).first()

    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    # Delete images from local folder
    # for img in product.images:
    #     image_path = img.image_url.replace("http://localhost:8000/", "")
    #     if os.path.exists(image_path):
    #         os.remove(image_path)

    for img in product.images:
        # Extract filename from URL
        filename = img.image_url.split("/")[-1]

        # Delete from Supabase storage
        supabase.storage.from_("product-images").remove([filename])


    db.delete(product)
    db.commit()

    return {"message": "Product deleted successfully"}


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
    image: UploadFile = File(None),
    db: Session = Depends(get_db),
    admin = Depends(get_current_admin)
):
    product = db.query(Product).filter(Product.id == id).first()

    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    # Update basic fields
    product.name = name
    product.description = description
    product.price = price
    product.category = category
    product.occasion = occasion
    product.fabric = fabric
    product.care_instruction = care_instruction
    product.stock = stock
    product.is_featured = is_featured

    # If new image uploaded
    # if image:
    #     file_path = os.path.join("public", image.filename)

    #     with open(file_path, "wb") as buffer:
    #         shutil.copyfileobj(image.file, buffer)

    #     image_url = f"http://localhost:8000/public/{image.filename}"

    #     # Delete old images from folder
    #     for img in product.images:
    #         old_path = img.image_url.replace("http://localhost:8000/", "")
    #         if os.path.exists(old_path):
    #             os.remove(old_path)

    #     # Delete old image records
    #     db.query(ProductImage).filter(
    #         ProductImage.product_id == product.id
    #     ).delete()

    #     # Add new image record
    #     new_image = ProductImage(
    #         product_id=product.id,
    #         image_url=image_url
    #     )
    #     db.add(new_image)


    # if image:
    #     # Delete old images from Supabase
    #     for img in product.images:
    #         filename = img.image_url.split("/")[-1]
    #         supabase.storage.from_("product-images").remove([filename])

    #     # Delete old DB records
    #     db.query(ProductImage).filter(
    #         ProductImage.product_id == product.id
    #     ).delete()

    #     # Upload new image
    #     file_ext = image.filename.split(".")[-1]
    #     unique_filename = f"{uuid.uuid4()}.{file_ext}"

    #     file_bytes = await image.read()

    #     supabase.storage.from_("product-images").upload(
    #         unique_filename,
    #         file_bytes
    #     )

    #     image_url = f"{os.getenv('SUPABASE_URL')}/storage/v1/object/public/product-images/{unique_filename}"

    #     new_image = ProductImage(
    #         product_id=product.id,
    #         image_url=image_url
    #     )

    #     db.add(new_image)



    if image:

        # ✅ Validate image extension
        allowed_extensions = {"jpg", "jpeg", "png", "webp"}

        file_ext = image.filename.split(".")[-1].lower()

        if file_ext not in allowed_extensions:
            raise HTTPException(status_code=400, detail="Invalid image format")

        # ✅ Read file and validate size
        file_bytes = await image.read()

        if len(file_bytes) > 5 * 1024 * 1024:
            raise HTTPException(status_code=400, detail="Image too large")

        # Now safe to delete old image
        for img in product.images:
            filename = img.image_url.split("/")[-1]
            supabase.storage.from_("product-images").remove([filename])

        db.query(ProductImage).filter(
            ProductImage.product_id == product.id
        ).delete()

        # Upload new image
        unique_filename = f"{uuid.uuid4()}.{file_ext}"

        supabase.storage.from_("product-images").upload(
            unique_filename,
            file_bytes
        )

        image_url = f"{SUPABASE_URL}/storage/v1/object/public/product-images/{unique_filename}"

        new_image = ProductImage(
            product_id=product.id,
            image_url=image_url
        )

        db.add(new_image)




    db.commit()
    db.refresh(product)

    return {"message": "Product updated successfully"}
