"""Database models for storing form submissions."""
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class Submission(db.Model):
    """Model for storing contact form submissions."""
    __tablename__ = 'submissions'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    topic = db.Column(db.String(20), nullable=False)
    language = db.Column(db.String(2), default='en')
    background = db.Column(db.String(50), nullable=False)
    experience = db.Column(db.String(20), nullable=False)
    interest = db.Column(db.Text)
    goal = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    email_sent = db.Column(db.Boolean, default=False)
    email_error = db.Column(db.Text)
    
    def __repr__(self):
        return f'<Submission {self.id}: {self.name} ({self.email})>'
    
    def to_dict(self):
        """Convert submission to dictionary."""
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'topic': self.topic,
            'language': self.language,
            'background': self.background,
            'experience': self.experience,
            'interest': self.interest,
            'goal': self.goal,
            'created_at': self.created_at.isoformat(),
            'email_sent': self.email_sent
        }
