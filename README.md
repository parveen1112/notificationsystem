# Web Notification system

Notification system 

# Custom Framework

I have created a custom framework over #express for this application. This framework is somewhat similar to sails.

api folder contains middlewares, controllers, models, services.
assets folder contains the static files.
logs folder will contain the generated log files. I am using winston for logging <lib/logger>.
configs contains the configuration files.
configs/env contains the environment configurations.
Grunt jobs to be define in Gruntfile.js

# Functionality

Login just requires username.
You will be able to see the notifications in the dropdown.
When you will click on the bell, notication counter will fade, unread notifications and read notifications can be seen in the dropdown.
When you will click on the document, notifications dropdown will fade.
When you will click on the bell, new notifications will be pushed in the dropdown as unread and will be unread until bell is clicked again.
On Refreshing all the read and unread notifications can be seen.


# Notification System

api folder contains the routes.js which contains the routes and their controllers and middlewares. using this file, we initialize our custom router <lib/router>.

We are using socket.io for PUSH Notifications. Created a perisistence connection manager in lib/persist-connect

We are using ejs templating. All the views exists in views folder.

configs/bootstrap.js initializes our router and persistence connection manager.

api/services/UserStore.js manages all the interaction with User and Notification Models <api/models>.

Mantaining Sessions in Memory Store


# Steps to start the application
1. Please install mongodb on your system.
2. npm install. Install grunt and grunt-cli globally
3. grunt
4. node server.js

# How to use

1. Login
2. Press bell to see notification dropdown. After evry 10seconds you will see a new notification.

If you are still not able to run it or wish to contribute. Then mail me
    Parveen Arora - <a href="mailto:parveen1112@gmail.com">parveen1112@gmail.com</a>
