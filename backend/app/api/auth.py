from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.future import select

from app.api.deps import SessionDep, CurrentUser
from app.core.security import get_password_hash, verify_password, create_access_token
from app.models.user import User
from app.models.profile import Profile
from app.schemas.user import UserCreate, User as UserSchema
from app.schemas.token import Token

router = APIRouter()

@router.post("/signup", response_model=UserSchema)
async def signup(user_in: UserCreate, session: SessionDep):
    result = await session.execute(select(User).where(User.email == user_in.email))
    user = result.scalars().first()
    
    if user:
        raise HTTPException(
            status_code=400,
            detail="The user with this email already exists in the system.",
        )
        
    db_user = User(
        email=user_in.email,
        hashed_password=get_password_hash(user_in.password),
    )
    session.add(db_user)
    await session.commit()
    await session.refresh(db_user)
    
    # Create profile
    db_profile = Profile(
        user_id=db_user.id,
        name=user_in.name or user_in.email.split("@")[0]
    )
    session.add(db_profile)
    await session.commit()
    
    return db_user

@router.post("/login", response_model=Token)
async def login(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    session: SessionDep
):
    result = await session.execute(select(User).where(User.email == form_data.username))
    user = result.scalars().first()
    
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Incorrect email or password"
        )
        
    access_token = create_access_token(subject=user.id)
    return {
        "access_token": access_token,
        "token_type": "bearer"
    }

@router.get("/me", response_model=UserSchema)
async def read_users_me(current_user: CurrentUser):
    return current_user
