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
		session["working_name"] = 'admin/Project';
		session["curr_project"] = 'Project';
		session["curr_file"] = ''
		return redirect(url_for("index"))

	return render_template('login.html');


@app.route('/logout')
def logout():
	session['logged_in'] = False
	session["username"] = ''
	session["working_name"] = '';
	session["curr_project"] = '';
	session["working_name"] = '';
	return redirect(url_for("login"));
