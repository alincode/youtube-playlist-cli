var jsonfile = require('jsonfile')
const PlaylistSummary = require('youtube-playlist-summary')
const msg = require('./msg')

exports.playlistItem = async function(config, playlistId) {
  try {
    const ps = new PlaylistSummary(config)
    let playlist = await ps.getPlaylistItems(playlistId)
    let fileName = playlistId + '.json'
    jsonfile.writeFile(fileName, playlist, function(err) {
      if (err) msg.failureMessage(err)
      else msg.successfulMessage('Generate json is done.')
    })
  } catch (error) {
    throw error
  }
}
