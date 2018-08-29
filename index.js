"use strict";

const express = require("express");
const bodyParser = require("body-parser");

const restService = express();
const http = require('http')
const querystring = require('querystring')

const MESSAGES = {
  NO_MOBILE: "There seems to be a problem. Please speak again.",
  INVALID_MOBILE: "",
  LEAD_FAILED: "",
  LEAD_SUCCESS: ""
}

restService.use(
  bodyParser.urlencoded({
    extended: true
  })
);

restService.use(bodyParser.json());

restService.post("/leads", function(request, response) {
  var body = request.body || {};
  var result = body.result || {};
  var parameters = result.parameters || {};
  var mobile = parameters.echoText;
  var speechValid = validateMobile(mobile);
  var responseJson;

  if (speechValid !== true) {
    responseJson = {
      speech: speechValid,
      displayText: speechValid,
      source: "HDFC-Life-Bot"
    };
    return response.json(responseJson);
  }

  postLead(mobile, function (error) {
    var message = error ? MESSAGES.LEAD_FAILED : MESSAGES.LEAD_SUCCESS;
    responseJson = {
      speech: message,
      displayText: message,
      source: "HDFC-Life-Bot"
    };
    return response.json(responseJson);
  })
});

function validateMobile(mobile) {
  var phoneNo = /^(\+\d{1,3}[- ]?)?\d{10}$/;
  if (mobile.value.match(phoneNo)) {
    return true;
  } else {
    return false;
  }
}

function postLead(mobile, callback) {
  var options = {
    host: "localhost",
    port: 8080,
    path: '/leads',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViODNlNWViOWU5ZWMzNmI3NGI3MWUxZSIsInJvbGUiOiJTVVBFUkFETUlOIn0=.uor5BbOW5qOHIKSE+xfAk2QOoI0PIcHuu9juzERUkXQ='
    }
  };
  const postData = querystring.stringify({
      "firstname": "",
      "lastname": "",
      "email": "",
      "mobile": mobile
  });

  const req = http.request(options, function(res) {
      res.setEncoding('utf8');
      res.on('data', (chunk) => {
        console.log('Body: ${ chunk }');
      });

      res.on('end', () => {
        console.log('No data found in response');
      });

      res.on('error', (err) => {
        console.error('Error in request: ${err.message}');
      });
  });

  req.write(postData);
  req.end();
}


restService.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});
