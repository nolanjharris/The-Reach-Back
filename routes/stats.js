var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Score = require('../models/score');

// stats route
router.get('/stats', function (req, res, next) {
  Score.find({}, function (err, allScores) {
    if (err) {
      console.log(err);
    } else {
      var agg = Score.aggregate(
        [{
            $match: {}
          },
          {
            $group: {
              _id: '$player.username',
              average: {
                $avg: '$toPar'
              },
              last_course: {
                $last: '$course'
              },
              last_date: {
                $last: '$date'
              },
              last_score: {
                $last: '$toPar'
              }
            }
          },
          {
            $sort: {
              average: 1
            }
          }
        ],
        function (err, result) {
          if (err) {
            console.log(err);
          } else {
            res.render('stats', {
              stats: result,
              scores: allScores
            });
          }
        }
      );
      // console.log(agg);
    }
  });
});

// logged in user stats route
router.get("/stats/:id", function (req, res) {
  User.find({
    username: req.body.username
  }).populate("scores").exec(function (err, foundUser) {
    if (err || !foundUser) {
      // req.flash("error", "User not found");
      res.redirect("back");
    } else {
      res.render("stats/:id", {
        user: foundUser
      });
    }
  });
});

module.exports = router;