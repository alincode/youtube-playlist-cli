const path = require('path');
const fs = require('fs');
const ytdl = require('youtube-dl');
const ProgressBar = require('progress');
const msg = require('./msg');

let folder = process.env.DOWNLOAD_FOLDER + '/';

exports.init = async function init(channelId) {
  console.log(`Download folder at ${folder}`);
  msg.highlightMessage('Please wait a few minutes, it will started download soon.\n');
  this.playlist(`https://www.youtube.com/playlist?list=${channelId}`);
}

exports.playlist = async function playlist(url) {
  let video = ytdl(url);

  video.on('error', function error(err) {
    if (err) console.log('error 2:', err);
  });

  let size = 0;
  let filename;

  video.on('info', function (info) {
    size = info.size;
    filename = info._filename;
    let output = path.join(folder, info._filename);
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
    if (size) {
      var percent = (pos / size * 100).toFixed(2);
      bar.update(percent / 100);
    }
  });

  video.on('next', playlist);

}