from flask import (Flask, render_template, request, Response)
import json

app = Flask(__name__)

data = {}


@app.route('/frontend')
def react_app():
    return render_template("index.html", flask_token="Hello world")


@app.route('/test')
def test():
    return Response('{"status":"ok"}', status=200, mimetype='application/json')


@app.route('/offer', methods=['POST'])
def offer():
    form = request.get_json()
    if form["type"] == "offer":
        data["offer"] = {"id": form['id'], "type": form['type'], "sdp": form['sdp']}
        return Response(status=200)
    else:
        return Response(status=400)


@app.route('/answer', methods=['POST'])
def answer():
    form = request.get_json()
    if form["type"] == "answer":
        data["answer"] = {"id": form['id'], "type": form['type'], "sdp": form['sdp']}
        return Response(status=200)
    else:
        return Response(status=400)


@app.route('/get_offer', methods=['GET'])
def get_offer():
    if "offer" in data:
        j = json.dumps(data["offer"])
        del data["offer"]
        return Response(j, status=200, mimetype='application/json')
    else:
        return Response(status=503)


@app.route('/get_answer', methods=['GET'])
def get_answer():
    if "answer" in data:
        j = json.dumps(data["answer"])
        del data["answer"]
        return Response(j, status=200, mimetype='application/json')
    else:
        return Response(status=503)


if __name__ == '__main__':
    app.run(host="0.0.0.0", port="5000", debug=True)
