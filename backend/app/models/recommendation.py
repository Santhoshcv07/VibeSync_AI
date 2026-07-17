from sqlalchemy import Column, Integer, ForeignKey, JSON
from sqlalchemy.orm import relationship
from app.db.session import Base

class Recommendation(Base):
    __tablename__ = "recommendations"
    id = Column(Integer, primary_key=True, index=True)
    vibe_id = Column(Integer, ForeignKey("vibes.id", ondelete="CASCADE"), unique=True)
    
    music = Column(JSON, nullable=True)
    youtube = Column(JSON, nullable=True)
    movies = Column(JSON, nullable=True)
    books = Column(JSON, nullable=True)
    visuals = Column(JSON, nullable=True)

    
    vibe = relationship("Vibe", back_populates="recommendation")
