var express =  require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
//routes variables
var zoo = require('./routes/zoo');


app.use(bodyParser.urlencoded({ extended: true }));

//routes
app.use('/zoo', zoo);






// Catchall route
app.get('/*', function (req, res) {
  var file = req.params[0] || '/views/index.html';
  res.sendFile(path.join(__dirname, './public', file));
});

//port stuff and listen
app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function () {
  console.log('Listening on port ', app.get('port'));
});
