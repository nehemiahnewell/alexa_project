'use strict';
var Alexa = require('alexa-sdk');
var Holidays = require('date-holidays');

//=========================================================================================================================================
//TODO: The items below this comment need your attention.
//=========================================================================================================================================

//Replace with your app ID (OPTIONAL).  You can find this value at the top of your skill's page on http://developer.amazon.com.  
//Make sure to enclose your value in quotes, like this: var APP_ID = "amzn1.ask.skill.bb4045e6-b3e8-4133-b650-72923c5980f1";
var APP_ID = undefined;

var SKILL_NAME = "Holiday Calendar";
var GET_FACT_MESSAGE = "Here's your result: ";
var HELP_MESSAGE = "You can ask me to tell me what are the upcoming holidays, or, you can say exit... What can I help you with?";
var HELP_REPROMPT = "What can I help you with?";
var STOP_MESSAGE = "Goodbye!";

// My code starts here

var today = new Date();
var hd = new Holidays('US');
var year = today.getFullYear();
var holidaysThisYear = hd.getHolidays(year).concat(hd.getHolidays(year +1));
var remainingHolidays = holidaysThisYear.filter(function(dates) { 
  dates.date = new Date(dates.date);
  
  if (dates.date - today > 0)
  {
    return dates;
  }
});

var holidayString = "The next holiday is " + remainingHolidays[0].name + " on " + remainingHolidays[0].date.toDateString() + ". Next is " + remainingHolidays[1].name + " on " + remainingHolidays[1].date.toDateString() + ". Finally, " + remainingHolidays[0].name + " is on " + remainingHolidays[0].date.toDateString() + ".";

var data = holidayString;

//=========================================================================================================================================
//Editing anything below this line might break your skill.  
//=========================================================================================================================================
exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('GetHolidayDataIntent');
    },
    'GetHolidayDataIntent': function () {
        var speechOutput = GET_FACT_MESSAGE + data;
        this.emit(':tellWithCard', speechOutput, SKILL_NAME, data);
    },
    'AMAZON.HelpIntent': function () {
        var speechOutput = HELP_MESSAGE;
        var reprompt = HELP_REPROMPT;
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', STOP_MESSAGE);
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', STOP_MESSAGE);
    }
};