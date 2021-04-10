from flask import (Flask, render_template)

app = Flask(__name__)


@app.route('/')
def react_app():
    return render_template("index.html", flask_token="Hello world")


app.run(debug=True)
