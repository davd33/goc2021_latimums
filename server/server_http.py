from flask import (Flask, render_template, Response)


app = Flask(__name__)

connected = set()


@app.route('/frontend')
def react_app():
    return render_template("index.html", flask_token="192.168.1.18")


@app.route('/test')
def test():
    return Response('{"status":"ok"}', status=200, mimetype='application/json')


if __name__ == '__main__':
    app.run(host="0.0.0.0", port="5000", debug=True)
