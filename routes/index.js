var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../', 'views', 'index.html'));
});

module.exports = router;

router.get('/data', function(req,res){
    res.json([
        {"id": 1, "title": "Call Mom", "startReminderTime": "2017-02-04T22:04:44.524Z", "lastReminderTime": "2017-02-05T22:04:44.524Z", "remindEveryDays": 5},
        {"id": 2, "title": "Call Dad", "startReminderTime": "2017-02-04T22:04:44.524Z", "lastReminderTime": "2017-02-05T22:04:44.524Z", "remindEveryDays": 5},
        {"id": 3, "title": "Call Sister", "startReminderTime": "2017-02-04T22:04:44.524Z", "lastReminderTime": "2017-02-05T22:04:44.524Z", "remindEveryDays": 5},
        {"id": 4, "title": "Go for a run", "startReminderTime": "2017-02-04T22:04:44.524Z", "lastReminderTime": "2017-02-05T22:04:44.524Z", "remindEveryDays": 5},
        {"id": 5, "title": "Eat a vegetable", "startReminderTime": "2017-02-04T22:04:44.524Z", "lastReminderTime": "2017-02-05T22:04:44.524Z", "remindEveryDays": 5},
        {"id": 6, "title": "Read", "startReminderTime": "2017-02-04T22:04:44.524Z", "lastReminderTime": "2017-02-05T22:04:44.524Z", "remindEveryDays": 5},
        {"id": 7, "title": "Ha", "startReminderTime": "2017-02-04T22:04:44.524Z", "lastReminderTime": "2017-02-05T22:04:44.524Z", "remindEveryDays": 5},
        {"id": 8, "title": "Save $100", "startReminderTime": "2017-02-04T22:04:44.524Z", "lastReminderTime": "2017-02-05T22:04:44.524Z", "remindEveryDays": 5},
        {"id": 9, "title": "Call Brother", "startReminderTime": "2017-02-04T22:04:44.524Z", "lastReminderTime": "2017-02-05T22:04:44.524Z", "remindEveryDays": 5},
        {"id": 10, "title": "Call Ex-wife", "startReminderTime": "2017-02-04T22:04:44.524Z", "lastReminderTime": "2017-02-05T22:04:44.524Z", "remindEveryDays": 5}]);
});
