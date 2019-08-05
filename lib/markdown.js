const YoutubePlaylistMarkdown = require('youtube-playlist-markdown')
const msg = require('./msg')

let config = {
  GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
}

let youtubePlaylistMarkdown

exports.generatorAll = async function generatorAll(channelId) {
  try {
    youtubePlaylistMarkdown = new YoutubePlaylistMarkdown(config)
    youtubePlaylistMarkdown.generatorAll(channelId)
    msg.successfulMessage('Generate all playlists is done.')
  } catch (error) {
    msg.failureMessage(error)
  }
}

exports.generatorPlaylist = async function generatorPlaylist(playlistId) {
  try {
    youtubePlaylistMarkdown = new YoutubePlaylistMarkdown(config)
    youtubePlaylistMarkdown.generatorPlaylist(playlistId)
    msg.successfulMessage('Generate a playlists is done.')
  } catch (error) {
    msg.failureMessage(error)
  }
}
