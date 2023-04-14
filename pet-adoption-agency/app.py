from flask import Flask, render_template, request, redirect, url_for
from flask_migrate import Migrate
from flask_debugtoolbar import DebugToolbarExtension
from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired, Optional, URL, AnyOf, NumberRange
from extensions import db
from models import Pet, AddPetForm, EditPetForm

app = Flask(__name__)

app.config['SECRET_KEY'] = 'your-secret-key'
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///adopt_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

migrate = Migrate(app, db)
toolbar = DebugToolbarExtension(app)


@app.route('/')
def homepage():
    name = request.args.get('name')
    if name:
        pets = Pet.query.filter_by(name=name).all()
    else:
        pets = Pet.query.all()
    print(url_for('add_pet'))
    return render_template('index.html', pets=pets)


@app.route('/add', methods=['GET', 'POST'])
def add_pet():
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


@app.route('/<int:pet_id>', methods=['GET', 'POST'])
def view_pet(pet_id):
    pet = Pet.query.get_or_404(pet_id)
    form = EditPetForm(obj=pet)

    if form.validate_on_submit():
        form.populate_obj(pet)
        db.session.commit()
        return redirect(url_for('view_pet', pet_id=pet_id))

    return render_template('view_pet.html', pet=pet, form=form)


if __name__ == "__main__":
    app.run(debug=True)
