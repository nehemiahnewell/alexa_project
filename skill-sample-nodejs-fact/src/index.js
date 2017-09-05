'use strict';
var Alexa = require('alexa-sdk');

//=========================================================================================================================================
//TODO: The items below this comment need your attention.
//=========================================================================================================================================

//Replace with your app ID (OPTIONAL).  You can find this value at the top of your skill's page on http://developer.amazon.com.  
//Make sure to enclose your value in quotes, like this: var APP_ID = "amzn1.ask.skill.bb4045e6-b3e8-4133-b650-72923c5980f1";
var APP_ID = undefined;

var SKILL_NAME = "Old Science Fiction Facts";
var GET_FACT_MESSAGE = "Here's your fact: ";
var HELP_MESSAGE = "You can say tell me a science fiction fact, or, you can say exit... What can I help you with?";
var HELP_REPROMPT = "What can I help you with?";
var STOP_MESSAGE = "Goodbye!";

//=========================================================================================================================================
//TODO: Replace this data with your own.  You can find translations of this data at http://github.com/alexa/skill-sample-node-js-fact/data
//=========================================================================================================================================
var data = [
    "While a Wizard of Earthsea is the first novel in Ursula K. Le Guin\'s, the first story published for it was the short story The Word of Unbinding.",
    "Jack of Shadow\'s final fate is unknown. He is last seen falling to his death, with Morningstar diving down to save him.",
    "Zelazny intended to return to the Amber series, and had written and released several short stories of set up before he died.",
    "While  it is common knowledge Tolken and Lewis were friends for a time, it is less well known that they had a falling out. Tolken felt that Lewis\s work was too Heavy-handed in it's religous message.",
    "While we will get them in book format, many classical works of science fiction were actually serialized in several magazines. They were only later collected into novels and sold individually.",
    "Conan is a decendent of the fallen people of Atlantis.",
    "Context is important. Much of the fear and madness in Lovecraft\s mythos can only be understood in the context of his racisim.",
    "People assosate The King in Yellow with Lovecraft. This is wrong, Lovecraft used him, but it came from Robert W. Chambers.",
    "People assosate the phrase, reverse the polarity, with Star Trek. However it's first use was in the Eighteen Ninty Six novel Edison's Conquest of Mars by Garrett P. Serviss.",
    "Movie adaptations often change the names of works. Blade Runner is adapted from the novel, Do Androids dream of electronic sheep.",
    "The short story I Am Legend ends with the man character realizing he is the monster in this new world. Will Smith's movie adaptation of the same originally kept a spiritual successor to that ending, but it was changed at the last minute.",
    "William Gibson was depressed at the release of Blade Runner. He felt his novel, Neuromancer, would come off as derivative.",
    "There was an Anime adaptation of Lensmen, but it was extremely unfaithful to the source material, and it's rather hard to find even the small part that was translated in english anymore."
];

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
        this.emit('GetNewFactIntent');
    },
    'GetNewFactIntent': function () {
        var factArr = data;
        var factIndex = Math.floor(Math.random() * factArr.length);
        var randomFact = factArr[factIndex];
        var speechOutput = GET_FACT_MESSAGE + randomFact;
        this.emit(':tellWithCard', speechOutput, SKILL_NAME, randomFact)
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