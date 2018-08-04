#!/usr/bin/env node
const debug = require('debug')('ym');
const program = require('commander');
const chalk = require('chalk');
const figlet = require('figlet');
const YoutubePlaylistMarkdown = require('youtube-playlist-markdown');
const display = require('./display');
const jsonFormat = require('./jsonFormat');
const download = require('./download');

function highlightMessage(text) {
  console.log(chalk.red(text));
}

function successfulMessage(text) {
  console.log(chalk.blue(text));
}

function failureMessage(error) {
  console.log('\n\n\n');
  console.log(chalk.red(`It's failure, because ID is incorrect.`));
  console.log(`more detail error message -> ${error.message}`);
}

program
  .name('yp')
  .description('This is Youtube playlist CLI created by ' + chalk.yellow('alincode'))
  .version('0.0.1')
  .option('-c, --channel <channel_id>', 'generate all playlists')
  .option('-C, --output-channel <channel_id>', 'output the a channel')
  .option('-p, --playlist <playlist_id>', 'generate a playlist')
  .option('-P, --output-playlist <playlist_id>', 'output the a playlist')
  .option('-j, --json <playlist_id>', 'generate json a playlist')
  .option('-d, --download <playlist_id>', 'download playlist')
  .parse(process.argv);

let config = {
  GOOGLE_API_KEY: process.env.GOOGLE_API_KEY
};

const youtubePlaylistMarkdown = new YoutubePlaylistMarkdown(config);
// console.log('program:\n', program);
console.log('\n');

if (program.json){
  jsonFormat.playlistItem(config, program.json)
    .then((result) => {
      successfulMessage('Generate json is done.')
    })
    .catch((error) => { failureMessage(error); });
} else if (program.download) {
  highlightMessage('Please wait a few minutes, it will started download soon.\n');
  download.playlistItem(`https://www.youtube.com/playlist?list=${program.download}`);
} else if (program.outputChannel) {
  display.playlist(config, program.outputChannel).catch((error) => { failureMessage(error); });
} else if (program.outputPlaylist) {
  display.playlistItem(config, program.outputPlaylist).catch((error) => { failureMessage(error); });
} else if (program.channel) {
  config.CHANNEL_ID = program.channel;
  youtubePlaylistMarkdown.generatorAll(program.channel)
    .then((result) => {
      successfulMessage('Generate all playlists is done.')
    })
    .catch((error) => { failureMessage(error); });
} else if (program.playlist) {
  youtubePlaylistMarkdown.generatorPlaylist(program.playlist)
    .then((result) => {
      successfulMessage('Generate a playlists is done.')
    })
    .catch((error) => { failureMessage(error); });
} else {
  program.help();
}
