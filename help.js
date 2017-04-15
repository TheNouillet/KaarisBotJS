module.exports.help = function(bot, map, themeAlias) {
    var content = "";
    console.log(themeAlias);
    if(themeAlias == undefined) {
        console.log("Caught general help");
        content = "Here are the available themes :\n";
        
        map.forEach(function(theme) {
            content += "- ";
            var i = 0;
            for(i = 0; i < theme.aliases.length; i++) {
                content += theme.aliases[i];
                if(i < theme.aliases.length - 1) {
                    content += " / ";
                }
            }
            content += '\n';
        });
        
        content += "Type !help <theme> to know more";
    }
    else {
        var themeFound = false;
        map.forEach(function(theme) {
            theme.aliases.forEach(function(alias) {
                if(themeAlias == alias) {
                    themeFound = true;
                    content = "Here are the available commands for the theme \"" + themeAlias + "\" :\n";
                    for(var commandName in theme.commands) {
                        content += "- " + commandName + "\n";
                    }
                }
            });
        });
        if(!themeFound) {
            content = "Theme \"" + themeAlias + "\" not found";
        }
    }
    
    console.log("The message content : ");
    console.log(content);
    return content;
}