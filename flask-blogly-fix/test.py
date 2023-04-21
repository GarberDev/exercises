from flask import session
from unittest import TestCase
from app import app
from models import db, User

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///boggle_test'
app.config['SQLALCHEMY_ECHO'] = False
app.config['TESTING'] = True

db.drop_all()
db.create_all()


class FlaskTests(TestCase):

    def setUp(self):
        """Add a user to the database."""

        User.query.delete()

        user = User(first_name='John', last_name='Doe', image_url=None)
        db.session.add(user)
        db.session.commit()

    def tearDown(self):
        """Clean up any fouled transaction."""

        db.session.rollback()

    def test_check_word(self):
        """Test the check_word view."""

        with app.test_client() as client:
            with client.session_transaction() as sess:
                sess['board'] = [['A', 'B', 'C', 'D'], ['E', 'F', 'G', 'H'], [
                    'I', 'J', 'K', 'L'], ['M', 'N', 'O', 'P']]

            resp = client.get('/check-word?word=apple')

            self.assertEqual(resp.status_code, 200)
            self.assertEqual(resp.json['result'], 'ok')

    def test_user_listing(self):
        """Test the user_listing view."""

        with app.test_client() as client:
            resp = client.get('/users')

            self.assertEqual(resp.status_code, 200)
            self.assertIn('John Doe', resp.get_data(as_text=True))

    def test_user_detail(self):
        """Test the user_detail view."""

        with app.test_client() as client:
            resp = client.get('/users/1')

            self.assertEqual(resp.status_code, 200)
            self.assertIn('John Doe', resp.get_data(as_text=True))

    def test_create_user(self):
        """Test the create_user view."""

        with app.test_client() as client:
            data = {'first_name': 'Jane',
                    'last_name': 'Doe', 'image_url': None}
            resp = client.post('/users', data=data, follow_redirects=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('Jane Doe', resp.get_data(as_text=True))

    def test_update_user(self):
        """Test the update_user view."""

        with app.test_client() as client:
            data = {'first_name': 'John',
                    'last_name': 'Doe', 'image_url': None}
            resp = client.post('/users/1/edit', data=data,
                               follow_redirects=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('John Doe', resp.get_data(as_text=True))

    def test_delete_user(self):
        """Test the delete_user view."""

        with app.test_client() as client:
            resp = client.post('/users/1/delete', follow_redirects=True)

            self.assertEqual(resp.status_code, 200)
            self.assertNotIn('John Doe', resp.get_data(as_text=True))
