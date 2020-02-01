import os
import subprocess

def dir_check(user, proj):
	if not os.path.isdir("data/{}/{}".format(user, proj)):
		os.system("mkdir data/{}/{}".format(user, proj))


def create_file(user, project, filename, content):
	dir_check(user, project)
	path = "data/{}/{}/{}".format(user, project, filename)
	if (os.path.isfile(path)):
		return None
	with open(path, "w") as f:
		f.write(content)
 
def create_dir(user, proj, dirname):
	os.system("mkdir data/{}/{}/{}".format(user, proj, dirname))

def save_file(user, filename, project, content):
	dir_check(user, project)
	path = "data/{}/{}/{}".format(user, project, filename)
	with open(path, "w") as f:
		f.write(content)

def delete_file(user, project, filename):
	path = "data/{}/{}/{}".format(user, project, filename)
	if (os.path.isfile(path)):
		os.system("rm {}".format(path))

def run_file(user, project, filename):
	dir_check(user, project)
	path = "data/{}/{}/{}".format(user, project, filename)
	if (filename.split(".")[-1] == "py"):
		proc = subprocess.Popen(["python3 {}".format(path)], stdout=subprocess.PIPE, shell=True)
		(out, err) = proc.communicate()
		return (out, err)

def merge(d1, d2):
	for key  in d2.keys():
		if key not in d1.keys():
			d1[key] = d2[key]
	return d1

def get_files(user, proj):
	dir_check(user, proj)
	d = dict()
	path = "data/{}/{}/".format(user, proj)
	d = rec_files(path, d, 0)
	return d

def rec_files(path, d, c):
	contents = os.listdir(path)
	for con in contents:
		if os.path.isfile(path + con):
			filename = " " *c*2 + con
			rel_path = path + con
			d[filename] = rel_path
		elif os.path.isdir(path + con):
			dirname = " " * c + con + "/"
			rel_path = path + con + "/"
			d[dirname] = rel_path
			newd = rec_files(rel_path, d, c+1)
			d = merge(d, newd)
	return d


if __name__ == "__main__":
	create_file("thomas", "testproj", "test1.txt", "1\n")
	create_file("thomas", "testproj", "test2.txt", "2\n")
	x = get_files("thomas", "testproj")
	for k in x.keys():
		print("{}\t{}".format(k, x[k]))
