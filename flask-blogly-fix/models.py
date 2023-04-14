from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from sqlalchemy import UniqueConstraint

db = SQLAlchemy()


def init_app(app):
    db.init_app(app)


class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    image_url = db.Column(db.String, nullable=True, default=None)

    def __repr__(self):
        return f'<User {self.first_name} {self.last_name}>'


class Post(db.Model):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String, nullable=False)
    content = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False,
                           default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    user = db.relationship('User', backref=db.backref('posts', lazy=True))

    def __repr__(self):
        return f'<Post {self.title} by User {self.user_id}>'


class Tag(db.Model):
    __tablename__ = 'tags'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String, nullable=False, unique=True)

    posts = db.relationship('Post', secondary='post_tags', backref='tags')

    def __repr__(self):
        return f'<Tag {self.name}>'


class PostTag(db.Model):
    __tablename__ = 'post_tags'
    __table_args__ = (UniqueConstraint(
        'post_id', 'tag_id', name='unique_post_tag'),)

    post_id = db.Column(db.Integer, db.ForeignKey(
        'posts.id'), primary_key=True)
    tag_id = db.Column(db.Integer, db.ForeignKey('tags.id'), primary_key=True)

    post = db.relationship('Post', backref=db.backref(
        'post_tags', cascade='all, delete-orphan'))
    tag = db.relationship('Tag', backref=db.backref(
        'post_tags', cascade='all, delete-orphan'))

    def __repr__(self):
        return f'<PostTag post_id={self.post_id}, tag_id={self.tag_id}>'
