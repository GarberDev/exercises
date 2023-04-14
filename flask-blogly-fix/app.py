from flask import Flask, request, render_template, redirect, session, jsonify, url_for
from sqlalchemy import desc
from flask_sqlalchemy import SQLAlchemy
from flask import Flask, render_template, session, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_debugtoolbar import DebugToolbarExtension
from models import User, init_app, db, Post, PostTag, Tag


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///boggle'
app.config['SECRET_KEY'] = 'secretkey'
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False


init_app(app)


# boggle_game = Boggle()


@app.route('/')
def home():
    """Render Home Template ie indexx from boggle repurposed for blogly"""
    posts = Post.query.order_by(desc(Post.created_at)).all()
    return render_template('index.html', posts=posts)


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


@app.route('/users/<int:user_id>/posts/new', methods=['POST'])
def create_post(user_id):
    user = User.query.get_or_404(user_id)
    title = request.form['title']
    content = request.form['content']
    tag_ids = [int(tag_id) for tag_id in request.form.getlist('tags')]

    post = Post(title=title, content=content, user_id=user_id)
    db.session.add(post)
    db.session.commit()

    for tag_id in tag_ids:
        post_tag = PostTag(post_id=post.id, tag_id=tag_id)
        db.session.add(post_tag)

    db.session.commit()

    return redirect(url_for('user_detail', user_id=user_id))


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
    all_tags = Tag.query.all()  # Fetch all tags
    # Pass all_tags to the template
    return render_template('new_post.html', user=user, all_tags=all_tags)


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

    old_tags = post.tags
    new_tag_ids = {int(tag_id) for tag_id in request.form.getlist('tags')}

    for tag in old_tags:
        if tag.id not in new_tag_ids:
            post.tags.remove(tag)

    for tag_id in new_tag_ids:
        tag = Tag.query.get(tag_id)
        if tag not in post.tags:
            post.tags.append(tag)

    db.session.commit()

    return redirect(url_for('post_detail', post_id=post_id))


@app.route('/posts/<int:post_id>/delete', methods=['POST'])
def delete_post(post_id):
    post = Post.query.get_or_404(post_id)
    user_id = post.user_id
    db.session.delete(post)
    db.session.commit()

    return redirect(url_for('user_detail', user_id=user_id))


@app.route('/tags/new', methods=['GET'])
def new_tag():
    return render_template('add_tag.html')


@app.route('/tags', methods=['POST'])
def create_tag():
    name = request.form['name']
    tag = Tag(name=name)
    db.session.add(tag)
    db.session.commit()

    return redirect(url_for('list_tags'))


@app.route('/tags/<int:tag_id>', methods=['GET'])
def show_tag(tag_id):
    tag = Tag.query.get_or_404(tag_id)
    return render_template('show_tag.html', tag=tag)


@app.route('/tags/<int:tag_id>/edit', methods=['GET'])
def edit_tag(tag_id):
    tag = Tag.query.get_or_404(tag_id)
    return render_template('edit_tag.html', tag=tag)


@app.route('/tags/<int:tag_id>/edit', methods=['POST'])
def update_tag(tag_id):
    tag = Tag.query.get_or_404(tag_id)
    tag.name = request.form['name']
    db.session.commit()

    return redirect(url_for('list_tags'))
