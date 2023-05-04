"""User view tests."""

# run these tests like:
#
#    FLASK_ENV=production python -m unittest test_user_views.py

from app import app, CURR_USER_KEY
import os
from unittest import TestCase

from models import db, User, Message, Follows

os.environ['DATABASE_URL'] = "postgresql:///warbler-test"


app.config['WTF_CSRF_ENABLED'] = False

db.create_all()


class UserViewTestCase(TestCase):
    """Test views for users."""

    def setUp(self):
        """Create test client, add sample data."""

        User.query.delete()
        Message.query.delete()
        Follows.query.delete()

        self.client = app.test_client()

        self.testuser = User.signup(username="testuser",
                                    email="test@test.com",
                                    password="testuser",
                                    image_url=None)

        db.session.commit()

    def test_show_user(self):
        """Can use see user profile?"""

        with self.client as c:
            resp = c.get(f"/users/{self.testuser.id}")

            self.assertEqual(resp.status_code, 200)
            self.assertIn("@testuser", str(resp.data))

    def test_show_following(self):
        """Can you see who the user is following when logged in?"""

        with self.client as c:
            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = self.testuser.id

            resp = c.get(f"/users/{self.testuser.id}/following")

            self.assertEqual(resp.status_code, 200)
            self.assertIn("Following", str(resp.data))

    def test_show_followers(self):
        """Can you see the user's followers when logged in?"""

        with self.client as c:
            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = self.testuser.id

            resp = c.get(f"/users/{self.testuser.id}/followers")

            self.assertEqual(resp.status_code, 200)
            self.assertIn("Followers", str(resp.data))

    def test_show_following_logged_out(self):
        """Are you disallowed from visiting a user's following page when logged out?"""

        with self.client as c:
            resp = c.get(
                f"/users/{self.testuser.id}/following", follow_redirects=True)

            self.assertEqual(resp.status_code, 200)
            self.assertNotIn("Following", str(resp.data))
            self.assertIn("Access unauthorized", str(resp.data))

    def test_show_followers_logged_out(self):
        """Are you disallowed from visiting a user's followers page when logged out?"""

        with self.client as c:
            resp = c.get(
                f"/users/{self.testuser.id}/followers", follow_redirects=True)

            self.assertEqual(resp.status_code, 200)
            self.assertNotIn("Followers", str(resp.data))
            self.assertIn("Access unauthorized", str(resp.data))
