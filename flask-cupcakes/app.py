from flask import Flask, request, jsonify, render_template
from models import db, Cupcake, connect_db

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///cupcakes'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'secret'

connect_db(app)


@app.route("/")
def root():
    """Render homepage."""

    return render_template("index.html")


@app.route('/api/cupcakes', methods=['GET'])
def get_all_cupcakes():
    """Return all cupcakes in system."""
    cupcakes = Cupcake.query.all()
    cupcakes_data = [{'id': c.id, 'flavor': c.flavor, 'size': c.size, 'rating': c.rating, 'image': c.image} for c in cupcakes]
    return jsonify(cupcakes=cupcakes_data)


@app.route('/api/cupcakes/<int:cupcake_id>', methods=['GET'])
def get_cupcake(cupcake_id):
    """Return data on specific cupcake."""
    cupcake = Cupcake.query.get_or_404(cupcake_id)
    cupcake_data = {'id': cupcake.id, 'flavor': cupcake.flavor, 'size': cupcake.size, 'rating': cupcake.rating, 'image': cupcake.image}
    return jsonify(cupcake=cupcake_data)


@app.route('/api/cupcakes', methods=['POST'])
def create_cupcake():
    flavor = request.json['flavor']
    size = request.json['size']
    rating = request.json['rating']
    image = request.json.get('image', 'https://tinyurl.com/demo-cupcake')

    new_cupcake = Cupcake(flavor=flavor, size=size, rating=rating, image=image)
    db.session.add(new_cupcake)
    db.session.commit()

    cupcake_data = {'id': new_cupcake.id, 'flavor': new_cupcake.flavor, 'size': new_cupcake.size, 'rating': new_cupcake.rating, 'image': new_cupcake.image}
    return (jsonify(cupcake=cupcake_data), 201)


@app.route('/api/cupcakes/<int:cupcake_id>', methods=['PATCH'])
def update_cupcake(cupcake_id):
    cupcake = Cupcake.query.get_or_404(cupcake_id)
    data = request.json

    cupcake.flavor = data.get('flavor', cupcake.flavor)
    cupcake.size = data.get('size', cupcake.size)
    cupcake.rating = data.get('rating', cupcake.rating)
    cupcake.image = data.get('image', cupcake.image)

    db.session.commit()

    return jsonify(cupcake=cupcake.serialize())


@app.route('/api/cupcakes/<int:cupcake_id>', methods=['DELETE'])
def delete_cupcake(cupcake_id):
    cupcake = Cupcake.query.get_or_404(cupcake_id)
    db.session.delete(cupcake)
    db.session.commit()

    return jsonify(message='Deleted')
