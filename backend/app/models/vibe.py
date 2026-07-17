from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.db.session import Base

class Vibe(Base):
    __tablename__ = "vibes"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"))
    mood = Column(String, nullable=False)
    activity = Column(String, nullable=False)
    time_of_day = Column(String, nullable=False)
    energy_level = Column(String, nullable=False)
    ai_summary = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    user = relationship("User", back_populates="vibes")
    recommendation = relationship("Recommendation", back_populates="vibe", uselist=False)
    saved_by_users = relationship("SavedVibe", back_populates="vibe")
