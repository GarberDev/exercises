from app import app
import os
from unittest import TestCase

from models import db, User, Message, Follows

os.environ['DATABASE_URL'] = "postgresql:///warbler-test"


db.create_all()


class UserModelTestCase(TestCase):
    """Test User model."""

    def setUp(self):
        """Create test client, add sample data."""

        User.query.delete()
        Message.query.delete()
        Follows.query.delete()

        self.client = app.test_client()

        self.user1 = User(
            email="test1@test.com",
            username="testuser1",
            password="HASHED_PASSWORD1"
        )

        self.user2 = User(
            email="test2@test.com",
            username="testuser2",
            password="HASHED_PASSWORD2"
        )

        db.session.add_all([self.user1, self.user2])
        db.session.commit()

    def test_user_model(self):
        """Does basic model work?"""

        u = User(
            email="test@test.com",
            username="testuser",
            password="HASHED_PASSWORD"
        )

        db.session.add(u)
        db.session.commit()

        self.assertEqual(len(u.messages), 0)
        self.assertEqual(len(u.followers), 0)

    def test_repr_method(self):
        """Does the repr method work as expected?"""

        repr_result = repr(self.user1)
        self.assertEqual(
            repr_result, f"<User #{self.user1.id}: {self.user1.username}, {self.user1.email}>")

    def test_is_following(self):
        """Does is_following successfully detect when user1 is following user2?"""

        self.user1.following.append(self.user2)
        db.session.commit()

        self.assertTrue(self.user1.is_following(self.user2))
        self.assertFalse(self.user2.is_following(self.user1))

    def test_is_followed_by(self):
        """Does is_followed_by successfully detect when user1 is followed by user2?"""

        self.user2.followers.append(self.user1)
        db.session.commit()

        self.assertTrue(self.user1.is_followed_by(self.user2))
        self.assertFalse(self.user2.is_followed_by(self.user1))

    def test_create_user(self):
        """Does User.create successfully create a new user given valid credentials?"""

        user = User.signup("testuser3", "test3@test.com", "testpassword", None)
        db.session.commit()

        found_user = User.query.filter_by(username="testuser3").first()

        self.assertIsNotNone(found_user)
        self.assertEqual(found_user.email, "test3@test.com")

    def test_authenticate_user(self):
        """Does User.authenticate successfully return a user when given a valid username and password?"""

        user = User.signup("testuser4", "test4@test.com", "testpassword", None)
        db.session.commit()

        auth_user = User.authenticate("testuser4", "testpassword")
        self.assertIsNotNone(auth_user)
        self.assertEqual(auth_user.id, user.id)

    def test_authenticate_invalid_username(self):
        """Does User.authenticate fail to return a user when the username is invalid?"""

        user = User.signup("testuser5", "test5@test.com", "testpassword", None)
        db.session.commit()

        auth_user = User.authenticate("invalidusername", "testpassword")
        self.assertFalse(auth_user)

    def test_authenticate_invalid_password(self):
        """Does User.authenticate fail to return a user when the password is invalid?"""

        user = User.signup("testuser6", "test6@test.com", "testpassword", None)
        db.session.commit()
        auth_user = User.authenticate("testuser6", "invalidpassword")
        self.assertFalse(auth_user)
