var express = require('express');
var router = express.Router();
var pg = require('pg');
//should match SQL
var connectionString = 'postgres://localhost:5432/mu';

router.get('/', function (req, res) {
  pg.connect(connectionString, function (err, client, done) {


    if (err) {
      res.sendStatus(500);
    }

    client.query('SELECT * FROM zoo', function (err, result) {
      done();

      console.log(result.rows);

      res.send(result.rows);
    });
  });
});

router.post('/', function (req, res) {
  var zoo = req.body;
  var rng = randomNumber(0, 100);

  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      res.sendStatus(500);
    }

    client.query('INSERT INTO zoo (animal_type, amount) ' +
                  'VALUES ($1, $2)',
                   [zoo.animal_type, rng],
                 function (err, result) {
                   done();

                   if (err) {
                     res.sendStatus(500);
                     return;
                   }

                   res.sendStatus(201);
                 });
  });
});

//utility function
function randomNumber(min, max){
      return Math.floor(Math.random() * (1 + max - min) + min);
}

module.exports = router;
