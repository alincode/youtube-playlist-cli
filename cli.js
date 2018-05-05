#!/usr/bin/env node
const debug = require('debug')('ym');
const program = require('commander');
const chalk = require('chalk');
const figlet = require('figlet');
const YoutubePlaylistMarkdown = require('youtube-playlist-markdown');
const displayPlaylistItem = require('./displayPlaylistItem');

function successfulMessage(text) {
  console.log(chalk.blue(text));
}

function failureMessage(error) {
  console.log('\n\n\n');
  console.log(chalk.red(`It's failure, because ID is incorrect.`));
  console.log(`more detail error message -> ${error.message}`);
}

program
  .name('ym')
  .description('This is Youtube playlist markdown CLI created by ' + chalk.yellow('alincode'))
  .version('0.0.1')
  .option('-c, --channel <channel_id>', 'generate all playlists')
  .option('-p, --playlist <playlist_id>', 'generate a playlist')
  .option('-o, --output <playlist_id>', 'output the a playlist')
  .parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}

let config = {
  GOOGLE_API_KEY: process.env.GOOGLE_API_KEY
};

const youtubePlaylistMarkdown = new YoutubePlaylistMarkdown(config);

const id = process.argv[3];

if (program.channel) {
  config.CHANNEL_ID = id;
  youtubePlaylistMarkdown.generatorAll(id)
    .then((result) => {
      successfulMessage('Generate all playlists is done.')
    })
    .catch((error) => {
      failureMessage(error);
    });
} else if (program.playlist) {
  youtubePlaylistMarkdown.generatorPlaylist(id)
    .then((result) => {
      successfulMessage('Generate a playlists is done.')
    })
    .catch((error) => {
      failureMessage(error);
    });
} else if (program.output) {
  console.log('\n\n');
  displayPlaylistItem(config, id)
    .catch((error) => {
      failureMessage(error);
    });
}