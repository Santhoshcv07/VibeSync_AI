from pydantic import BaseModel, EmailStr
from typing import Optional

class UserBase(BaseModel):
    email: EmailStr

class UserCreate(UserBase):
    password: str
    name: Optional[str] = None

class UserInDBBase(UserBase):
    id: int
    is_active: bool

    class Config:
        from_attributes = True

class User(UserInDBBase):
    pass
