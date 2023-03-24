from flask import Flask, render_template, request
from story import Story

app = Flask(__name__)

# Define the prompts for the story
prompts = ["place", "noun", "verb", "adjective", "plural_noun"]

# Define the story
story = Story(prompts, """Once upon a time in a long-ago {place}, there lived a
                           large {adjective} {noun}. It loved to {verb} {plural_noun}.""")

@app.route('/')
def index():
    # Render the form template with prompts as the questions
    return render_template('form.html', prompts=prompts)

@app.route('/story', methods=['POST'])
def generate_story():
    # Get the answers from the form and generate the story
    answers = {}
    for prompt in prompts:
        answers[prompt] = request.form[prompt]
    generated_story = story.generate(answers)
    # Render the story template with the generated story
    return render_template('story.html', story=generated_story)
