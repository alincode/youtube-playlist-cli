const PlaylistSummary = require('youtube-playlist-summary')
const msg = require('./msg')

exports.playlistItem = async function(config, playlistId) {
  try {
    const ps = new PlaylistSummary(config)
    let playlist = await ps.getPlaylistItems(playlistId)
    console.log(`### ${playlist.channelTitle} : ${playlist.playlistTitle}\n`)
    playlist.items.forEach(function(item, index) {
      console.log(`* ${item.title}`)
    })
  } catch (error) {
    msg.failureMessage(error)
    throw error
  }
}

exports.playlist = async function(config, channelId) {
  try {
    const ps = new PlaylistSummary(config)
    let playlists = await ps.getPlaylists(channelId)
    playlists.items.forEach(function(item, index) {
      console.log(`* ${item.title}`)
    })
  } catch (error) {
    msg.failureMessage(error)
    throw error
  }
}
