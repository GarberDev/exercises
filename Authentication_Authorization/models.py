from sqlalchemy import Column, String, Integer, Text, ForeignKey
from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()


class User(db.Model):
    __tablename__ = 'users'
    username = Column(String(20), primary_key=True,
                      unique=True, nullable=False)
    password = Column(String, nullable=False)
    email = Column(String(50), unique=True, nullable=False)
    first_name = Column(String(30), nullable=False)
    last_name = Column(String(30), nullable=False)

    def __repr__(self):
        return f"<User(username={self.username}, email={self.email}, first_name={self.first_name}, last_name={self.last_name})>"


class Feedback(db.Model):
    __tablename__ = 'feedback'

    id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String(100), nullable=False)
    content = Column(Text, nullable=False)
    username = Column(String(20), ForeignKey('users.username'), nullable=False)

    user = db.relationship('User', backref='feedback')

    def __repr__(self):
        return f"<Feedback(id={self.id}, title={self.title}, content={self.content}, username={self.username})>"


def connect_db(app):
    """Connect to database."""

    db.app = app
    db.init_app(app)
