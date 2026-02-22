from sqlalchemy import Column, Integer, String, Text, Numeric, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    description = Column(Text)
    price = Column(Numeric(10,2), nullable=False)
    category = Column(String)
    occasion = Column(String)
    fabric = Column(String)
    care_instruction = Column(Text)
    stock = Column(Integer, default=0)
    is_featured = Column(Boolean, default=False)

    images = relationship("ProductImage", back_populates="product", cascade="all, delete")
