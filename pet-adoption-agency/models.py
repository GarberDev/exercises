from flask_sqlalchemy import SQLAlchemy
from flask import Flask, render_template, request, redirect, url_for
from flask_migrate import Migrate
from flask_debugtoolbar import DebugToolbarExtension
from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired, Optional, URL, AnyOf, NumberRange
import psycopg2
from wtforms.fields import StringField, IntegerField, BooleanField, TextAreaField, SubmitField


from extensions import db


class Pet(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    species = db.Column(db.String, nullable=False)
    photo_url = db.Column(db.String, nullable=True)
    age = db.Column(db.Integer, nullable=True)
    notes = db.Column(db.String, nullable=True)
    available = db.Column(db.Boolean, nullable=False, default=True)

    def __repr__(self):
        return f'<Pet {self.name}>'


class AddPetForm(FlaskForm):
    name = StringField('Pet Name', validators=[DataRequired()])
    species = StringField('Species', validators=[DataRequired(), AnyOf(
        ['cat', 'dog', 'porcupine'], message='Species must be "cat", "dog", or "porcupine".')])
    photo_url = StringField('Photo URL', validators=[
                            Optional(), URL(message='Invalid URL.')])
    age = IntegerField('Age', validators=[Optional(), NumberRange(
        min=0, max=30, message='Age must be between 0 and 30.')])
    notes = StringField('Notes', validators=[Optional()])
    submit = SubmitField('Add Pet')


class EditPetForm(FlaskForm):
    photo_url = StringField('Photo URL', validators=[Optional(), URL()])
    notes = TextAreaField('Notes', validators=[Optional()])
    available = BooleanField('Available')
    submit = SubmitField('Save Changes')
