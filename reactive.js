#!/usr/bin/env node

const debug = require('debug')('ymr');
const chalk = require('chalk');
const figlet = require('figlet');
const inquirer = require('inquirer');
const YoutubePlaylistMarkdown = require('youtube-playlist-markdown');
const displayPlaylistItem = require('./displayPlaylistItem');

const Rx = require('rxjs/Rx');
const log = console.log;

const observe = Rx.Observable.create(function (obs) {
  obs.next({
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
  });

  obs.next({
    type: 'rawlist',
    name: 'typeText',
    message: 'What things you like to do?',
    choices: [ 'only show the information', 'generate a playlist', 'generate all playlist']
  });

  obs.next({
    type: 'input',
    name: 'PLAYLIST_ID',
    message: "Input the Youtube playlist ID?",
    validate: function (value) {
      var pass = value.length >= 34;
      if (!value) return true;
      if (pass) return true;
      return 'Please enter a valid Youtube playlist ID.';
    }
  });

  obs.next({
    type: 'input',
    name: 'CHANNEL_ID',
    message: "Input the Youtube channel ID?",
    validate: function (value) {
      var pass = value.length >= 24;
      if (!value) return true;
      if (pass) return true;
      return 'Please enter a valid Youtube channel ID.';
    }
  });

  obs.complete();
});

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

log(chalk.blue(figlet.textSync('Welcome!', { horizontalLayout: 'full' })));

inquirer.prompt(observe).then(answers => {
  console.log('\n\n');
  let config = { GOOOGLE_API_KEY: answers.GOOOGLE_API_KEY };
  const youtubePlaylistMarkdown = new YoutubePlaylistMarkdown(config);
  const type = getType(answers.typeText);
  switch (type) {
    case 1:
      displayPlaylistItem(config, answers.PLAYLIST_ID);
      break;
    case 2:
      youtubePlaylistMarkdown.generatorPlaylist(answers.PLAYLIST_ID);
      break;
    case 3:
      youtubePlaylistMarkdown.generatorAll(answers.CHANNEL_ID);
      break;
    default:
      break;
  }
});