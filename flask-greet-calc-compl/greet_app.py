@app.route('/welcome')
def say_welcome():
    return "welcome"

@app.route('/welcome/home')
def say_welcome():
    return "welcome home"
    
@app.route('/welcome/back')
def say_welcome():
    return "welcome/back"