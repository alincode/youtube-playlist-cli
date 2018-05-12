const PlaylistSummary = require('youtube-playlist-summary');

const displayPlaylistItem = async function (config, playlistId) {
  try {
    const ps = new PlaylistSummary(config);
    let playlist = await ps.getPlaylistItems(playlistId);
    console.log(`### ${playlist.channelTitle} : ${playlist.playlistTitle}\n`);
    playlist.items.forEach(function (item, index) {
      console.log(`* ${item.title}`)
    });
  } catch (error) {
    throw error;
  }
}

module.exports = displayPlaylistItem;