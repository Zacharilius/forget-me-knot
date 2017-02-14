var express = require('express');
var router = express.Router();
var path = require('path');

// Index Page
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../', 'views', 'index.html'));
});

// Angular routes
router.get('/views/home.view.html', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../', 'views', 'home.view.html'));
});

router.get('/views/login.view.html', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../', 'views', 'login.view.html'));
});

router.get('/views/register.view.html', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../', 'views', 'register.view.html'));
});

router.get('/views/reminders.view.html', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../', 'views', 'reminders.view.html'));
});

module.exports = router;

// Rest API
// =============================================================================

// Reminders
var reminders = [
        {"id": 1, "ownerId": 1, "title": "Call Mom", "startReminderTime": "2017-02-04T22:04:44.524Z", "lastReminderTime": "2017-02-05T22:04:44.524Z", "remindEveryDays": 5},
        {"id": 2, "ownerId": 1, "title": "Call Dad", "startReminderTime": "2017-02-04T22:04:44.524Z", "lastReminderTime": "2017-02-05T22:04:44.524Z", "remindEveryDays": 5},
        {"id": 3, "ownerId": 1, "title": "Call Sister", "startReminderTime": "2017-02-04T22:04:44.524Z", "lastReminderTime": "2017-02-05T22:04:44.524Z", "remindEveryDays": 5},
        {"id": 4, "ownerId": 1, "title": "Go for a run", "startReminderTime": "2017-02-04T22:04:44.524Z", "lastReminderTime": "2017-02-05T22:04:44.524Z", "remindEveryDays": 5},
        {"id": 5, "ownerId": 1, "title": "Eat a vegetable", "startReminderTime": "2017-02-04T22:04:44.524Z", "lastReminderTime": "2017-02-05T22:04:44.524Z", "remindEveryDays": 5},
        {"id": 6, "ownerId": 0, "title": "Read", "startReminderTime": "2017-02-04T22:04:44.524Z", "lastReminderTime": "2017-02-05T22:04:44.524Z", "remindEveryDays": 5},
        {"id": 7, "ownerId": 0, "title": "Ha", "startReminderTime": "2017-02-04T22:04:44.524Z", "lastReminderTime": "2017-02-05T22:04:44.524Z", "remindEveryDays": 5},
        {"id": 8, "ownerId": 0, "title": "Save $100", "startReminderTime": "2017-02-04T22:04:44.524Z", "lastReminderTime": "2017-02-05T22:04:44.524Z", "remindEveryDays": 5},
        {"id": 9, "ownerId": 0, "title": "Call Brother", "startReminderTime": "2017-02-04T22:04:44.524Z", "lastReminderTime": "2017-02-05T22:04:44.524Z", "remindEveryDays": 5},
        {"id": 10, "ownerId": 0, "title": "Call Ex-wife", "startReminderTime": "2017-02-04T22:04:44.524Z", "lastReminderTime": "2017-02-05T22:04:44.524Z", "remindEveryDays": 5}
    ];

function getRemindersForUserId(id) {
    var userReminders = reminders.filter(function(a){
        return a['ownerId'] == ownerId;
    });
    return userReminders;
}

router.get('/api/reminders/:username', function(req, res) {
    var username = req.params.username;
    var user = getUserForUsername(username);
    var ownerId = user.id;

    res.json(userReminders);
});

router.post('/api/reminders', function(req, res) {
    var reminders = req.body;
    res.json(reminders);
});

router.delete('/api/reminders/:id', function(req, res) {
    var id = req.params.id;
    reminders = reminders.filter(function(a){
        return a['id'] != id;
    });

    res.json(reminders);
});

// User
var users = [
        {"id": 0, "firstName": "Zach", "lastName": "Bensley", "username": "zabensley", "password": "password" },
        {"id": 1, "firstName": "Deana", "lastName": "Bensley", "username": "dsbensley", "password": "password" },
    ];

function getUserForUsername(username) {
    for (var i in users) {
        var user = users[i];
        if (user.username == username) {
            return user;
        }
    }
    return;
}

router.get('/api/users', function(req, res) {
    res.json(users);
});

router.get('/api/users/:username', function(req, res) {
    var username = req.params.username;
    for (var i in users) {
        var user = users[i];
        if (user.username === username) {
            res.user = user;
            res.json(user);
            return;
        }
    }
    res.sendStatus(404); /* Not Found */
    return;
});

router.post('/api/users', function(req, res) {
    var message = req.body;

    var id = users.length;
    var username = message.username;
    var password = message.password;
    var firstName = message.firstName;
    var lastName = message.lastName;

    var newUser = {"id": id, "firstName": firstName, "lastName": lastName,"username": username, "password": password};
    users.push(newUser);
    res.json(true);
    return;
});

// Authentication
router.post('/api/authenticate', function(req, res) {
    var message = req.body;

    var receivedUsername = message.username;
    var receivedPassword = message.password;
    for (var i in users) {
        var user = users[i];
        if (user.username === receivedUsername && user.password === receivedPassword) {
            res.json();
            return;
        }
    }
    res.sendStatus(401); /* Not authorized */
    return;
});


