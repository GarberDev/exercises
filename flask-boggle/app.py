from flask import Flask, request, render_template, redirect, session, jsonify
from boggle import Boggle

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secretkey'
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

boggle_game = Boggle()

@app.route('/')
def home():
    """Render the game board and display user's high score and total number of plays."""
    board = boggle_game.make_board()
    session['board'] = board
    highscore = session.get('highscore', 0)
    totalplays = session.get('totalplays', 0)
    return render_template('index.html', board=board, highscore=highscore, totalplays=totalplays)

@app.route('/check-word', methods = ['GET'])
def check_word():
    """Check if a given word is valid in the current game board."""
    word = request.args.get('word')
    board = session['board']
    result = boggle_game.check_valid_word(board, word)
    return jsonify({'result': result})



@app.route("/post-score", methods=['POST'])
def post_score():
    """Update the user's high score and total number of plays, and return whether the user broke their previous high score."""
    score = request.json.get('score', 0)
    highscore = session.get('highscore', 0)
    totalplays = session.get('totalplays', 0)

    session['totalplays'] = totalplays + 1
    session['highscore'] = max(score, highscore)

    return jsonify(brokeRecord=score > highscore)
