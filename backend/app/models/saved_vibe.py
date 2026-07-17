from sqlalchemy import Column, Integer, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.db.session import Base

class SavedVibe(Base):
    __tablename__ = "saved_vibes"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"))
    vibe_id = Column(Integer, ForeignKey("vibes.id", ondelete="CASCADE"))
    saved_at = Column(DateTime(timezone=True), server_default=func.now())
    
    user = relationship("User", back_populates="saved_vibes")
    vibe = relationship("Vibe", back_populates="saved_by_users")
