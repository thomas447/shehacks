from app import app

#from flask import session
from flask import Flask, session, redirect, url_for, request, render_template

@app.route('/')
@app.route('/index')
def index():
	if not session.get('logged_in'):
		return redirect(url_for('login'))
	return render_template("index.html")


@app.route('/login', methods=['POST', 'GET'])
def login():

	if session.get("logged_in") and session["logged_in"]:
		return redirect(url_for("index"))

	if (request.method == 'POST'):
		session["username"] = request.form["username"]
		session["logged_in"] = True
		return "Hello, {}".format(session["username"])
	else:
		return redirect(url_for("index"))


@app.route('/logout')
def logout():
	session['logged_in'] = False
	return "Logged Out"
