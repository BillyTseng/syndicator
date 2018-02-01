var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var events = require('./routes/events');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/events', events);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

var Event = require(__dirname + "/models/event");
const createTestCafe = require('testcafe');
var fs = require('fs');
//const timeoutScheduled = Date.now();
setInterval(cronJobs, 1000 * 60 * 60);

function cronJobs( )
{
  const delay = Date.now() - timeoutScheduled;
  //console.log(`${delay}ms have passed since I was scheduled`);
  Event.findOne({posted: false}, function(err, doc) {
    if (doc === null) {
      //console.log("no data");
    } else {
      // Produce the scripts.
      produceScriptEventbrite(doc.name, doc.startDate, doc.endDate);
      // Run the scripts.
      runScripts();

      // Set the flag of posted to true in database.
      console.log(doc.name + ', ' + doc.description);
      doc.posted = true;
      Event.findByIdAndUpdate(doc._id, doc, function(err, doc) {
          if (err) {
            console.log("err:" + err);
          } else if (doc) {
            console.log("success: posted=" + doc.posted);
          } else {
            console.log("other");
          }
      });
    }
  });
}

function produceScriptEventbrite(name, startDate, endDate) {
  var account = "yourEmail";
  var password = "yourPassword";
  var newstartDate = (startDate.getMonth() + 1) + '/' + startDate.getDate() + '/' + startDate.getFullYear();
  var newendDate = (endDate.getMonth() + 1) + '/' + endDate.getDate() + '/' + endDate.getFullYear();
  var data = "";
  data += "import { Selector } from 'testcafe'; fixture `Getting Started`.page `https://www.eventbrite.com/create`;";
  data += 'test("Eventbrite", async t => {const startDate = Selector(".hasDatepicker").nth(0);' +
      'const endDate = Selector(".hasDatepicker").nth(1);' +
      'await t.typeText("#signin-email", "' + account + '")' +
      '.click("button[type=submit]").typeText("#password", "' + password + '")' +
      '.click("button[type=submit]").typeText("#id_group-details-name", "' + name + '")' +
      '.typeText(startDate, "' + newstartDate + '", { replace: true }).typeText(endDate, "' + newendDate + '", { replace: true })' +
      '.click("#create-ticket-free-button").typeText("#id_group-tickets-0-ticket_type", "' + name + '")' +
      '.typeText("#id_group-tickets-0-quantity_total", "100").click("#make-event-live-button-almost-done")' +
      '.expect(Selector("#publish-success").innerText).contains("Congratulations");});'
  fs.writeFileSync(__dirname + '/testScripts/eventbrite.js', data);
}

function runScripts() {
  let testcafe         = null;
  createTestCafe('localhost', 1337, 1338)
      .then(tc => {
          testcafe     = tc;
          const runner = testcafe.createRunner();

          return runner
              .src([__dirname + '/testScripts/eventbrite.js'])
              .browsers(['chrome'])
              .run();
      })
      .then(failedCount => {
          console.log('Tests failed: ' + failedCount);
          testcafe.close();
      });
}

module.exports = app;
