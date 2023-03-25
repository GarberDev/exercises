responses = []


from flask import Flask, render_template, redirect, request, session
from surveys import satisfaction_survey

app = Flask(__name__)
app.secret_key = "SECRET_KEY"

@app.route("/", methods=["GET", "POST"])
def show_start_page():
    """ show start page"""
    if request.method == "POST":
        session["responses"] = []
        return redirect("/questions/0")
    title = satisfaction_survey.title
    instructions = satisfaction_survey.instructions
    return render_template("start.html", title = title, instructions= instructions)


@app.route("/questions/<int:qid>")
def show_question(qid):
    """show question"""
    if qid == len(satisfaction_survey.questions):
        return redirect("/thanks")
    question = satisfaction_survey.questions[qid]
    question_num = qid + 1  # calculate the question number
    return render_template("question.html", question=question, question_num=question_num, qid=qid)


@app.route("/answer", methods=["POST"])
def handle_answer():
    """handle answer"""
    response = request.form["answer"]
    qid = int(request.form["qid"])
    session.setdefault("responses", []) # create list in session if it does not exist
    session["responses"].append(response)
    if qid + 1 == len(satisfaction_survey.questions):
        return redirect("/thanks")
    else:
        return redirect(f"/questions/{qid+1}")



@app.route("/thanks")
def show_thanks():
    """show thank you page"""
    return render_template("thanks.html")
