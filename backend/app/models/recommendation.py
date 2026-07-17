from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import relationship
from app.db.session import Base

class Recommendation(Base):
    __tablename__ = "recommendations"
    id = Column(Integer, primary_key=True, index=True)
    vibe_id = Column(Integer, ForeignKey("vibes.id", ondelete="CASCADE"), unique=True)
    
    music = Column(JSONB, nullable=True)
    youtube = Column(JSONB, nullable=True)
    movies = Column(JSONB, nullable=True)
    books = Column(JSONB, nullable=True)
    visuals = Column(JSONB, nullable=True)
    
    vibe = relationship("Vibe", back_populates="recommendation")
