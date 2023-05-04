from app import app
import os
from unittest import TestCase
from sqlalchemy import exc

from models import db, User, Message, Likes, Follows

os.environ['DATABASE_URL'] = "postgresql:///warbler-test"


db.create_all()


class MessageModelTestCase(TestCase):
    """Test the functionality of the Message model."""

    def setUp(self):
        """Create test client, add sample data."""

        db.drop_all()
        db.create_all()

        self.uid = 111
        u = User(id=self.uid, username="testuser",
                 email="test@test.com", password="testpassword")
        db.session.add(u)
        db.session.commit()

        self.u = User.query.get(self.uid)

        self.client = app.test_client()

    def tearDown(self):
        """Clean up any fouled transaction."""

        db.session.rollback()

    def test_message_repr(self):
        """Does the repr method work as expected?"""

        m = Message(id=123, text="Test message", user_id=self.uid)
        db.session.add(m)
        db.session.commit()

        self.assertEqual(repr(m), "<Message #123: Test message>")

    def test_message_creation(self):
        """Does the message creation work as expected?"""

        m = Message(text="Test message", user_id=self.uid)
        db.session.add(m)
        db.session.commit()

        self.assertEqual(len(Message.query.all()), 1)
        self.assertEqual(Message.query.first().text, "Test message")

    def test_message_relationship(self):
        """Is the relationship between the User and Message models set up correctly?"""

        m = Message(text="Test message", user_id=self.uid)
        db.session.add(m)
        db.session.commit()

        self.assertEqual(self.u.messages[0].id, m.id)
        self.assertEqual(m.user.id, self.uid)

    def test_message_length(self):
        """Does the text attribute enforce a maximum length of 140 characters?"""

        text = "a" * 141
        m = Message(text=text, user_id=self.uid)

        with self.assertRaises(exc.DataError):
            db.session.add(m)
            db.session.commit()
