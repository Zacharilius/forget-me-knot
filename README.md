# ForgetMeKnot

## Setup MongDB

### Create
$ docker run -p 27017:27017 --name some-mongo -d mongo

### Start
$ docker start some-mongo

## Run Node
$ npm start

## Run gulp
$ gulp

## Visit
Visit site at: http://127.0.0.1:3000/


## Email Prod Setup

### Local Email Setup
$ export GMAIL_SMTP_USER=username@gmail.com
$ export GMAIL_SMTP_PASSWORD=yourpassword

### Production Email Setup
$ heroku config:add GMAIL_SMTP_USER=email@gmail.com
$ heroku config:add GMAIL_SMTP_PASSWORD=yourpassword
