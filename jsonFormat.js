var jsonfile = require('jsonfile')
const PlaylistSummary = require('youtube-playlist-summary');

exports.playlistItem = async function (config, playlistId) {
  try {
    const ps = new PlaylistSummary(config);
    let playlist = await ps.getPlaylistItems(playlistId);
    let fileName = playlistId + '.json'
    jsonfile.writeFile(fileName, playlist, function (err) {
      if(err) console.error(err);
    })
  } catch (error) {
    throw error;
  }
}