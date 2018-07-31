const PlaylistSummary = require('youtube-playlist-summary');

const displayPlaylist = async function (config, channelId) {
  try {
    const ps = new PlaylistSummary(config);
    let playlists = await ps.getPlaylists(channelId);
    // console.log(`### ${playlist.channelTitle} : ${playlist.playlistTitle}\n`);
    playlists.items.forEach(function (item, index) {
      console.log(`* ${item.title}`)
    });
  } catch (error) {
    throw error;
  }
}

module.exports = displayPlaylist;