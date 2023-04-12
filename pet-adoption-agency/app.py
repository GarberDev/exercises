
from flask import Flask, render_template, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_debugtoolbar import DebugToolbarExtension
from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired, Optional, URL


app = Flask(__name__)

app.config['SECRET_KEY'] = 'your-secret-key'
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///adopt_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

migrate = Migrate(app, db)

toolbar = DebugToolbarExtension(app)


init_app(app)


@app.route('/')
def homepage():
    from models import Pet
    pets = Pet.query.all()
    return render_template('index.html', pets=pets)


class AddPetForm(FlaskForm):
    name = StringField('Pet Name', validators=[DataRequired()])
    species = StringField('Species', validators=[DataRequired()])
    photo_url = StringField('Photo URL', validators=[Optional(), URL()])
    age = IntegerField('Age', validators=[Optional()])
    notes = StringField('Notes', validators=[Optional()])
    submit = SubmitField('Add Pet')


@app.route('/add', methods=['GET', 'POST'])
def add_pet():
    # from models import Pet
    form = AddPetForm()

    if form.validate_on_submit():
        new_pet = Pet(
            name=form.name.data,
            species=form.species.data,
            photo_url=form.photo_url.data or None,
            age=form.age.data or None,
            notes=form.notes.data or None,
            available=True
        )
        db.session.add(new_pet)
        db.session.commit()
        return redirect(url_for('homepage'))

    return render_template('add_pet.html', form=form)


if __name__ == "__main__":
    app.run(debug=True)
