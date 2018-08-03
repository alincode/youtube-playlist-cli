# Youtube Playlist Markdown CLI

```

Youtube Playlist Markdown CLI is will outdated soon, it rename to be Youtube Playlist CLI.

```

![GitHub package version](https://img.shields.io/github/package-json/v/alincode/youtube-playlist-markdown-cli.svg)
![node version](https://img.shields.io/node/v/youtube-playlist-markdown-cli.svg)
![npm downloads](https://img.shields.io/npm/dt/youtube-playlist-markdown-cli.svg)
[![Dependency Status](https://img.shields.io/david/alincode/youtube-playlist-markdown-cli.svg?style=flat)](https://david-dm.org/alincode/youtube-playlist-markdown-cli)


Youtube Playlist Markdown CLI

### Requirements

* node 8.x.x

### Install


```sh
npm install -g youtube-playlist-markdown-cli
```

#### set your google api key

you need to get your API key, if you don't know how to do, maybe this video could help you.

[How to Get YouTube API Key - Easy way - YouTube](https://www.youtube.com/watch?v=_U_VS12uu-o)

then set up env

```
// for Mac
export GOOGLE_API_KEY="========== YOUR GOOGLE API KEY =========="

// for Windows
set GOOGLE_API_KEY=="========== YOUR GOOGLE API KEY =========="
```

[How To Edit System Environment Variables In Windows 10 - YouTube](https://www.youtube.com/watch?v=C-U9SGaNbwY)

### Usage via command mode

![](assets/cli.png)

```
ym

ym -c UCJi9ZAuo99MqMuJUXiJjpsA
ym -C UCJi9ZAuo99MqMuJUXiJjpsA

ym -p PLrG78JjvL7hWqX2FW54Ck8UP45fbWQXcu
ym -P PLrG78JjvL7hWqX2FW54Ck8UP45fbWQXcu
```

![](assets/example.png)

### Usage via reactive mode

![](assets/reactive.png)

``
ymr
``

### Dev

```
node cli.js -p "UCsvqVGtbbyHaMoevxPAq9Fg"
```

## Relevant Projects

* [youtube-playlist-summary](https://github.com/alincode/youtube-playlist-summary)
* [youtube-playlist-markdown](https://github.com/alincode/youtube-playlist-markdown)

## License

MIT © [alincode](https://github.com/alincode/youtube-playlist-markdown-cli)
