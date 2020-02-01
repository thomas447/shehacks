from app import app

#from flask import session
from flask import Flask, session, redirect, url_for, request, render_template

@app.route('/')
@app.route('/index')
def index():
	if not session.get('logged_in'):
		return redirect(url_for('login'))
	return "Hello, World!"


@app.route('/login')
def login():
	session['logged_in'] = True
	return render_template("login.html")


@app.route('/logout')
def logout():
	session['logged_in'] = False
	return "Logged Out"
