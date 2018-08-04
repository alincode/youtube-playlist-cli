const path = require('path');
const fs = require('fs');
const ytdl = require('youtube-dl');
const ProgressBar = require('progress');

exports.playlistItem = async function playlist(url) {
  let video = ytdl(url);

  video.on('error', function error(err) {
    if (err) console.log('error 2:', err);
  });

  let size = 0;
  let filename;

  video.on('info', function (info) {
    size = info.size;
    filename = info._filename;
    let output = path.join(__dirname + '/', info._filename);
    console.log(`${info._filename}`)
    video.pipe(fs.createWriteStream(output));
  });

  let pos = 0;
  let bar = new ProgressBar('downloading [:bar] :percent', {
    complete: '=',
    incomplete: ' ',
    width: 40,
    total: 100
  });

  video.on('data', function data(chunk) {
    pos += chunk.length;
    // `size` should not be 0 here.
    if (size) {
      var percent = (pos / size * 100).toFixed(2);
      // process.stdout.cursorTo(0);
      // process.stdout.clearLine(1);
      bar.update(percent / 100);
      // process.stdout.write(percent + '%');
    }
  });

  video.on('next', playlist);

}