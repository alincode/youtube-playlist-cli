#!/usr/bin/env node
const debug = require('debug')('ym')
const { program } = require('commander')
const chalk = require('chalk')
const display = require('./lib/display')
const jsonFormat = require('./lib/jsonFormat')
const download = require('./lib/download')
const markdown = require('./lib/markdown')

program
  .name('yp')
  .description(
    'This is Youtube playlist CLI created by ' + chalk.yellow('alincode')
  )
  .version('0.0.1')
  .option('-c, --channel <channel_id>', 'generate all playlists')
  .option('-C, --output-channel <channel_id>', 'output the a channel')
  .option('-p, --playlist <playlist_id>', 'generate a playlist')
  .option('-P, --output-playlist <playlist_id>', 'output the a playlist')
  .option('-j, --json <playlist_id>', 'generate json a playlist')
  .option('-d, --download-playlist <playlist_id>', 'download playlist')
  .option('-D, --download-video <video_id>', 'download video')

program.parse(process.argv)
const options = program.opts()

let config = {
  GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
}

// console.log('options:\n', options)
console.log('\n')

if (options.json) {
  jsonFormat.playlistItem(config, options.json)
} else if (options.downloadPlaylist) {
  download.playlist(options.downloadPlaylist)
} else if (options.downloadVideo) {
  download.video(options.downloadVideo)
} else if (options.outputChannel) {
  display.playlist(config, options.outputChannel)
} else if (options.outputPlaylist) {
  display.playlistItem(config, options.outputPlaylist)
} else if (options.channel) {
  config.CHANNEL_ID = options.channel
  markdown.generatorAll(options.channel)
} else if (options.playlist) {
  markdown.generatorPlaylist(options.playlist)
} else {
  options.help()
}
