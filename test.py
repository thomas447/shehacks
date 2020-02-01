import os
import subprocess

def dir_check(user):
	if not os.path.isdir("data/{}".format(user)):
		os.system("mkdir data/{}".format(user))

def create_file(user, filename, content):
	dir_check(user)
	path = "data/{}/{}".format(user, filename)
	if (os.path.isfile(path)):
		return None
	with open(path, "w") as f:
		f.write(content)

def save_file(user, filename, content):
	path = "data/{}/{}".format(user, filename)
	with open(path, "w") as f:
		f.write(content)

def delete_file(user, filename):
	path = "data/{}/{}".format(user, filename)
	if (os.path.isfile(path)):
		os.system("rm {}".format(path))

def run_file(user, filename):
	path = "data/{}/{}".format(user, filename)
	if (filename.split(".")[-1] == "py"):
		proc = subprocess.Popen(["python3 {}".format(path)], stdout=subprocess.PIPE, shell=True)
		(out, err) = proc.communicate()
		return (out, err)

if __name__ == "__main__":
	run_file("thomas", "test.py")
