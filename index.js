const Discord = require("discord.js");
const config = require("./config");
const fs = require("fs");
const fileUtils = require("./utils/fileUtils");

const client = new Discord.Client();

function iniciar() {
    
    
    console.log("Conectando...");
    client.login(config);
}

function carregarComandos() {
    for (const dirInfo of fileUtils.searchByExtension("commands", 'js')) {
        const dirList = dirInfo.directory.split('/');
        dirList.shift();
        dirList.shift();
        const commandCategory = dirList.join('/');

        for (const file of dirInfo.files) {
            let cmd = require(file);
            if(!cmd.help) {
                // Comando inválido
                continue;
            }
    
            client.commands.set(cmd.help.name, cmd);
            if(cmd.help.aliases) {
                cmd.help.aliases
                .filter(alias => alias.trim() !== '')
                .forEach(alias => client.aliases.set(alias, cmd.help.name));
            }
        }

        const formatedFiles = dirInfo.files.map(file => file.split('/').pop().split('.').shift())
        console.log(`[Gerenciador de Comandos] Foram carregados ` + dirInfo.files.length + ' comandos na categoria ' + commandCategory + '. [' + formatedFiles.join(', ') + ']');
    }
}


iniciar();