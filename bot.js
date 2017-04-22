var Eris = require("eris");
var inspect = require('eyes').inspector({maxLength: false});
var parser = require("./parser");
var helper = require("./help");

const AudioListener = require("./lib/AudioListener");

var botToken = process.argv[2];
var specialCharacter = '!';
//var fileMap = parser.get();

var bot = new Eris(botToken);

var randomProperty = function (object) {
    var keys = Object.keys(object);
    return object[keys[Math.floor(keys.length * Math.random())]];
};

var getFileName = function(commandArray) {
    var res = null;
    fileMap.forEach(function(theme) {
        theme.aliases.forEach(function(alias) {
            if(commandArray[0] == specialCharacter + alias) {
                if(commandArray.length < 2) {
                    res = randomProperty(theme.commands);
                }
                else {
                    if(commandArray[1] in theme.commands) {
                        res = theme.commands[commandArray[1]];
                    }
                }
            }
        });
    });
    
    return res;
}

bot.on("ready", () => {
    console.log("Ready!");
    bot.audioListener = new AudioListener(bot, parser, specialCharacter);
});
bot.on("messageCreate", (msg) => {
    var content = msg.content;
    if(content[0] == specialCharacter) {
        var commandArray = content.split(" ");
        
        if(commandArray[0] == specialCharacter + "set-jail") {
            if(msg.member.permission.has("kickMembers")) {
                
            }
        }
        
        if(commandArray[0] == specialCharacter + "jail") {
            if(msg.member.permission.has("kickMembers")) {
                
            }
        }
        
        if(commandArray[0] == specialCharacter + "help") {
            console.log("Catching help");
            bot.createMessage(msg.channel.id, helper.help(bot, fileMap, commandArray[1]));
        }
        
        else {
            /*if(!msg.channel.guild) { // Check if the message was sent in a guild
                //bot.createMessage(msg.channel.id, "This command can only be run in a server.");
                return;
            }
            if(!msg.member.voiceState.channelID) { // Check if the user is in a voice channel
                //bot.createMessage(msg.channel.id, "You are not in a voice channel.");
                return;
            }
            var fileName = getFileName(commandArray);
            if(fileName != null) {
                console.log('Playing ' + fileName);
                bot.joinVoiceChannel(msg.member.voiceState.channelID).catch((err) => { // Join the user's voice channel
                    bot.createMessage(msg.channel.id, "Error joining voice channel: " + err.message); // Notify the user if there is an error
                    console.log(err); // Log the error
                }).then((connection) => {
                    connection.play(fileName); // Play the file and notify the user
                    connection.once("end", () => {
                        if(!connection.playing) {
                            bot.leaveVoiceChannel(msg.member.voiceState.channelID);
                        }
                    });
                });
            }*/
            console.log("Trying to notify ...");
            bot.audioListener.notify({msg: msg, commandArray: commandArray});
        }
    }
});
bot.connect();