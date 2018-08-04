const PlaylistSummary = require('youtube-playlist-summary');

exports.playlistItem = async function (config, playlistId) {
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

exports.playlist = async function (config, channelId) {
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