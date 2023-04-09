from flask import Flask, request, render_template, redirect, session, jsonify, url_for
from boggle import Boggle
from flask_sqlalchemy import SQLAlchemy
from flask import Flask, render_template, session, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_debugtoolbar import DebugToolbarExtension
from models import User, init_app, db, Post


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///boggle'
app.config['SECRET_KEY'] = 'secretkey'
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False


init_app(app)


# db = SQLAlchemy()


boggle_game = Boggle()


@app.route('/')
def home():
    """Render the game board and display user's high score and total number of plays."""
    board = boggle_game.make_board()
    session['board'] = board
    highscore = session.get('highscore', 0)
    totalplays = session.get('totalplays', 0)
    return render_template('index.html', board=board, highscore=highscore, totalplays=totalplays)


@app.route('/check-word', methods=['GET'])
def check_word():
    """Check if a given word is valid in the current game board."""
    word = request.args.get('word')
    board = session['board']
    result = boggle_game.check_valid_word(board, word)
    return jsonify({'result': result})


@app.route('/users/new', methods=['GET'])
def new_user():
    return render_template('new_user.html')


@app.route('/users', methods=['GET'])
def user_listing():
    users = User.query.all()
    return render_template('user_listing.html', users=users)


@app.route('/users/<int:user_id>', methods=['GET'])
def user_detail(user_id):
    user = User.query.get_or_404(user_id)
    return render_template('user_detail.html', user=user)


@app.route('/users/<int:user_id>/edit', methods=['GET'])
def edit_user(user_id):
    user = User.query.get_or_404(user_id)
    return render_template('user_edit.html', user=user)


@app.route('/users/<int:user_id>/edit', methods=['POST'])
def update_user(user_id):
    user = User.query.get_or_404(user_id)
    user.first_name = request.form['first_name']
    user.last_name = request.form['last_name']
    user.image_url = request.form['image_url'] if request.form['image_url'] else None
    db.session.commit()
    return redirect(url_for('user_listing'))


@app.route('/users/<int:user_id>/delete', methods=['POST'])
def delete_user(user_id):
    user = User.query.get_or_404(user_id)
    db.session.expunge(user)
    db.session.delete(user)
    db.session.commit()
    return redirect(url_for('user_listing'))


@app.route('/users', methods=['POST'])
def create_user():
    first_name = request.form['first_name']
    last_name = request.form['last_name']
    image_url = request.form['image_url'] if request.form['image_url'] else None

    user = User(first_name=first_name,
                last_name=last_name, image_url=image_url)
    db.session.add(user)
    db.session.commit()

    users = User.query.all()
    return render_template('user_listing.html', users=users)


@app.route("/post-score", methods=['POST'])
def post_score():
    """Update the user's high score and total number of plays, and return whether the user broke their previous high score."""
    score = request.json.get('score', 0)
    highscore = session.get('highscore', 0)
    totalplays = session.get('totalplays', 0)

    session['totalplays'] = totalplays + 1
    session['highscore'] = max(score, highscore)

    return jsonify(brokeRecord=score > highscore)


@app.route('/users/<int:user_id>/posts/new', methods=['GET'])
def new_post(user_id):
    user = User.query.get_or_404(user_id)
    return render_template('new_post.html', user=user)


@app.route('/users/<int:user_id>/posts/new', methods=['POST'])
def create_post(user_id):
    user = User.query.get_or_404(user_id)
    title = request.form['title']
    content = request.form['content']

    post = Post(title=title, content=content, user_id=user_id)
    db.session.add(post)
    db.session.commit()

    return redirect(url_for('user_detail', user_id=user_id))


@app.route('/posts/<int:post_id>', methods=['GET'])
def post_detail(post_id):
    post = Post.query.get_or_404(post_id)
    return render_template('post_detail.html', post=post)


@app.route('/posts/<int:post_id>/edit', methods=['GET'])
def edit_post(post_id):
    post = Post.query.get_or_404(post_id)
    return render_template('edit_post.html', post=post)


@app.route('/posts/<int:post_id>/edit', methods=['POST'])
def update_post(post_id):
    post = Post.query.get_or_404(post_id)
    post.title = request.form['title']
    post.content = request.form['content']
    db.session.commit()

    return redirect(url_for('post_detail', post_id=post_id))


@app.route('/posts/<int:post_id>/delete', methods=['POST'])
def delete_post(post_id):
    post = Post.query.get_or_404(post_id)
    user_id = post.user_id
    db.session.delete(post)
    db.session.commit()

    return redirect(url_for('user_detail', user_id=user_id))
