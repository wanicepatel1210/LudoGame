# Credentials Folder

## The purpose of this folder is to store all credentials needed to log into your server and databases. This is important for many reasons. But the two most important reasons is
    1. Grading , servers and databases will be logged into to check code and functionality of application. Not changes will be unless directed and coordinated with the team.
    2. Help. If help is needed with a team issue, this folder will help facilitate this giving the instructor all needed info AND instructions for logging into your team's server. 


# Blow is a list of items required. Missing items will causes points to be deducted from multiple milestone submissions.

1.	Server URL: http://ec2-18-191-136-71.us-east-2.compute.amazonaws.com/
2.	SSH username: ubuntu
3.	SSH key: cs667key.pem
4.	Database IP and port:127.0.0.1 | 3306
5.	Database username: root
6.	Database password: toor
7.	Database name: cs667db
8.  How to log into the server:

Using OSX/Linux:
1.	Download server key "cs667key.pem"
2.	Change into the directory where key is stored
3.	Run command "sudo ssh -i "cs667key.pem" ubuntu@http://ec2-18-191-136-71.us-east-2.compute.amazonaws.com/

Using Windows
1.	Download Putty
2.	Rebuild cs667key.pem to cs667key.ppk by PuTTYgen
3.	Enter hostname as "http://ec2-18-191-136-71.us-east-2.compute.amazonaws.com/"
4.	make sure the category you selected is SSH
5.	Select generated "cs667key.ppk"
6.	Click "Open"



