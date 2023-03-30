from flask import Flask, request, render_template, redirect, session, jsonify
from boggle import Boggle

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secretkey'
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

boggle_game = Boggle()

@app.route('/')
def home():
    board = boggle_game.make_board()
    session['board'] = board
    highscore = session.get('highscore', 0)
    totalplays = session.get('totalplays', 0)
    return render_template('index.html', board=board, highscore=highscore, totalplays=totalplays)

@app.route('/check-word', methods = ['GET'])
def check_word():
    word = request.args.get('word')
    board = session['board']
    result = boggle_game.check_valid_word(board, word)
    return jsonify({'result': result})



@app.route("/post-score", methods=['POST'])
def post_score():
    score = request.json.get('score', 0)
    highscore = session.get('highscore', 0)
    totalplays = session.get('totalplays', 0)

    session['totalplays'] = totalplays + 1
    session['highscore'] = max(score, highscore)

    return jsonify(brokeRecord=score > highscore)
