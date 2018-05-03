#!/usr/bin/env node

const debug = require('debug')('ymr');
const chalk = require('chalk');
const figlet = require('figlet');
const inquirer = require('inquirer');
const YoutubePlaylistMarkdown = require('youtube-playlist-markdown');
const displayPlaylistItem = require('./displayPlaylistItem');
const log = console.log;

const ASK_API_KEY = {
  type: 'input',
  name: 'GOOOGLE_API_KEY',
  message: "What's your Google API key?",
  default: function () {
    return process.env.GOOOGLE_API_KEY;
  },
  validate: function (value) {
    if (process.env.GOOOGLE_API_KEY) return true;
    var pass = value.length >= 39;
    if (pass) {
      return true;
    }
    return 'Please enter a valid Google API key.';
  }
};

const ASK_TYPE = {
  type: 'list',
  name: 'typeText',
  message: 'What things you like to do?',
  choices: ['only show the information', 'generate a playlist', 'generate all playlist']
};

const ASK_PLAYLIST_ID = {
  type: 'input',
  name: 'PLAYLIST_ID',
  message: "Input the Youtube playlist ID?",
  validate: function (value) {
    var pass = value.length >= 34;
    if (pass) return true;
    return 'Please enter a valid Youtube playlist ID.';
  }
};

const ASK_CHANNEL_ID = {
  type: 'input',
  name: 'CHANNEL_ID',
  message: "Input the Youtube channel ID?",
  validate: function (value) {
    var pass = value.length >= 24;
    if (pass) return true;
    return 'Please enter a valid Youtube channel ID.';
  }
};

function getType(val) {
  if (val == 'only show the information') {
    return 1;
  } else if (val == 'generate a playlist') {
    return 2;
  } else if (val == 'generate all playlist') {
    return 3;
  } else {
    return 0;
  }
}

function displayWelcomeMessage() {
  log(chalk.blue(figlet.textSync('Welcome!', { horizontalLayout: 'full' })));
}

async function main() {
  displayWelcomeMessage();
  const { GOOOGLE_API_KEY } = await inquirer.prompt(ASK_API_KEY);
  const config = { GOOOGLE_API_KEY };
  const { typeText } = await inquirer.prompt(ASK_TYPE);
  const type = getType(typeText);
  const youtubePlaylistMarkdown = new YoutubePlaylistMarkdown(config);

  if(type == 1 || type == 2){
    let { PLAYLIST_ID } = await inquirer.prompt(ASK_PLAYLIST_ID);
    console.log('\n\n');
    if (type == 1) await displayPlaylistItem(config, PLAYLIST_ID);
    if (type == 2) await youtubePlaylistMarkdown.generatorPlaylist(PLAYLIST_ID);
  } else {
    let { CHANNEL_ID } = await inquirer.prompt(ASK_CHANNEL_ID);
    await youtubePlaylistMarkdown.generatorAll(CHANNEL_ID);
  }
}

main();
