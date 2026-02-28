from pydantic import BaseModel
from typing import List, Optional

class ProductImageSchema(BaseModel):
    id: int
    image_url: str

    class Config:
        from_attributes = True


class ProductSchema(BaseModel):
    id: int
    name: str
    description: str | None
    price: float
    category: str | None
    occasion: str | None
    fabric: str | None
    care_instruction: str | None
    stock: int
    is_featured: bool
    images: List[ProductImageSchema] = []

    class Config:
        from_attributes = True




class ProductCreate(BaseModel):
    name: str
    description: Optional[str] = None
    price: float
    category: Optional[str] = None
    occasion: Optional[str] = None
    fabric: Optional[str] = None
    care_instruction: Optional[str] = None
    stock: int = 0
    is_featured: bool = False
    images: List[str] = []
