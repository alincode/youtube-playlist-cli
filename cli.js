#!/usr/bin/env node
const debug = require('debug')('ym');
const program = require('commander');
const chalk = require('chalk');
const figlet = require('figlet');
const display = require('./display');
const jsonFormat = require('./jsonFormat');
const download = require('./download');
const markdown = require('./markdown');

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

// console.log('program:\n', program);
console.log('\n');

if (program.json){
  jsonFormat.playlistItem(config, program.json);
} else if (program.download) {
  download.init(program.download);
} else if (program.outputChannel) {
  display.playlist(config, program.outputChannel);
} else if (program.outputPlaylist) {
  display.playlistItem(config, program.outputPlaylist);
} else if (program.channel) {
  config.CHANNEL_ID = program.channel;
  markdown.generatorAll(program.channel);
} else if (program.playlist) {
  markdown.generatorPlaylist(program.playlist);
} else {
  program.help();
}
