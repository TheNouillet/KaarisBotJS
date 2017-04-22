var Eris = require("eris");
var inspect = require('eyes').inspector({maxLength: false});
var parser = require("./parser");

const AudioListener = require("./lib/Listener/AudioListener");
const HelpListener = require("./lib/Listener/HelpListener");

var botToken = process.argv[2];
var specialCharacter = '!';
var fileMap = parser.get();

var bot = new Eris(botToken);
bot.on("ready", () => {
    bot.messageListeners = [];
    bot.messageListeners.push(new AudioListener(bot, fileMap, specialCharacter));
    bot.messageListeners.push(new HelpListener(bot, fileMap, specialCharacter));
    console.log("Ready!");
});
bot.on("messageCreate", (msg) => {
    bot.messageListeners.forEach(function(listener) {
        listener.notify(msg);
    });
});
bot.connect();