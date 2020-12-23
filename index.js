const Discord = require("discord.js");
const config = require("./config");
const fs = require("fs");
const fileUtils = require("./utils/fileUtils");

const client = new Discord.Client();
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

function iniciar() {
    console.log("Carregando eventos...");
    carregarEventos();
    console.log("Carregando comandos...");
    carregarComandos();
    
    console.log("Conectando...");
    client.login(config);
}

function carregarComandos() {
    for (const dirInfo of fileUtils.searchByExtension("./commands", 'js')) {
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

function carregarEventos(dir) {
    for (const dirInfo of fileUtils.searchByExtension("./events", 'js')) {
        for (const file of dirInfo.files) {
            let events = require(file);
            if(!Array.isArray(events)) {
                events = [events];
            }

            for (const event of events) {
                if(!event.name || !event.run) {
                    continue;
                }
    
                console.log(`[Gerenciador de Eventos] O evento ` + event.name + ' foi carregado!');
    
                client.on(event.name, (...args) => event.run(client, ...args));
            }
        }
    }
}


iniciar();