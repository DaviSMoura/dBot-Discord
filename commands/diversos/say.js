const Discord = require("discord.js")

exports.run = async (bot, message, args) => {
    if(!args[0]) return message.reply("**Insira um texto para eu imitar.**\n`.say <texto>`");
    const sayMessage = args.join(" ");

    message.delete().catch(O_o=>{});
    message.channel.send(sayMessage);

}

exports.help = {
    name: "say"
}