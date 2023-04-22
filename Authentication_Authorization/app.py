from flask import Flask, render_template, redirect, url_for, flash, session
# from flask_debugtoolbar import DebugToolbarExtension
from models import db, User, connect_db, Feedback
from forms import RegistrationForm, LoginForm, FeedbackForm
from sqlalchemy.exc import IntegrityError


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///auth_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'secret'

connect_db(app)


@app.route('/')
def index():
    feedbacks = Feedback.query.all()
    register_url = url_for('register')
    login_url = url_for('login')
    if 'username' in session:
        user = User.query.get(session['username'])
        username = user.username
    else:
        username = None
    return render_template('index.html', feedbacks=feedbacks, register_url=register_url, login_url=login_url, username=username)


@app.route('/register', methods=['GET', 'POST'])
def register():
    form = RegistrationForm()
    if form.validate_on_submit():
        user = User(username=form.username.data, password=form.password.data, email=form.email.data,
                    first_name=form.first_name.data, last_name=form.last_name.data)
        try:
            db.session.add(user)
            db.session.commit()
            session["username"] = user.username
            flash('User registered successfully!', 'success')
            return redirect(url_for('user_detail', username=user.username))
        except IntegrityError:
            db.session.rollback()
            flash('Username or Email is already taken.', 'danger')
    return render_template('register.html', form=form)


@app.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(username=form.username.data).first()
        if user and user.password == form.password.data:
            session["username"] = user.username
            flash('Logged in successfully!', 'success')
            return redirect(url_for('user_detail', username=user.username))
        else:
            flash('Invalid username or password.', 'danger')
    return render_template('login.html', form=form)


# @app.route('/users/<username>')
# def user_detail(username):
#     if "username" not in session or session["username"] != username:
#         flash("You must be logged in to view this page.", "danger")
#         return redirect(url_for("login"))

#     user = User.query.get_or_404(username)
#     return render_template("user_detail.html", feedbacks=Feedback)


@app.route('/secret')
def secret():
    if "username" not in session:
        flash("You must be logged in to view this page.", "danger")
        return redirect(url_for("login"))
    return 'You made it!'


@app.route('/logout')
def logout():
    session.pop("username", None)
    flash("You have been logged out.", "success")
    return redirect(url_for("index"))


@app.route('/users/<username>')
def user_detail(username):
    if 'username' not in session or session['username'] != username:
        flash('You must be logged in to view this page.', 'danger')
        return redirect(url_for('login'))
    user = User.query.get_or_404(username)
    feedbacks = Feedback.query.filter_by(username=username).all()
    return render_template('user_detail.html', user=user, feedbacks=feedbacks)


@app.route('/users/<username>/delete', methods=['POST'])
def delete_user(username):
    if 'username' not in session or session['username'] != username:
        flash('You must be logged in to view this page.', 'danger')
        return redirect(url_for('login'))
    user = User.query.get_or_404(username)
    db.session.delete(user)
    db.session.commit()
    session.clear()
    return redirect('/')


@app.route('/users/<username>/feedback/add', methods=['GET', 'POST'])
def add_feedback(username):
    if 'username' not in session or session['username'] != username:
        flash('You must be logged in to view this page.', 'danger')
        return redirect(url_for('login'))
    user = User.query.get_or_404(username)
    form = FeedbackForm()
    if form.validate_on_submit():
        feedback = Feedback(title=form.title.data,
                            content=form.content.data, username=username)
        db.session.add(feedback)
        db.session.commit()
        return redirect(f'/users/{username}')
    return render_template('feedback_add.html', form=form, user=user)


@app.route('/feedback/<int:feedback_id>/update', methods=['GET', 'POST'])
def update_feedback(feedback_id):
    feedback = Feedback.query.get_or_404(feedback_id)
    if 'username' not in session or session['username'] != feedback.username:
        flash('You must be logged in to view this page.', 'danger')
        return redirect(url_for('login'))
    form = FeedbackForm(obj=feedback)
    if form.validate_on_submit():
        feedback.title = form.title.data
        feedback.content = form.content.data
        db.session.commit()
        return redirect(f'/users/{feedback.username}')
    return render_template('feedback_update.html', form=form, feedback=feedback)


@app.route('/feedback/<int:feedback_id>/delete', methods=['POST'])
def delete_feedback(feedback_id):
    feedback = Feedback.query.get_or_404(feedback_id)
    if 'username' not in session or session['username'] != feedback.username:
        flash('You must be logged in to view this page.', 'danger')
        return redirect(url_for('login'))
    db.session.delete(feedback)
    db.session.commit()
    return redirect(f'/users/{feedback.username}')

# if __name__ == '__main__':
#     app.run(debug=True)
