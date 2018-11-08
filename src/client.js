const albumParse = require('./albumParse.js')

const request = require("superagent");

module.exports = class Client {
  /**
   * Represents the API keys.
   * @param {string} key Last.fm API key
   */
  constructor(keys) {
    keys = keys || {};
    this.lfm = keys.key;
  }

  getAlbumInfo(artist, album) {
    if(!artist || !album) throw new Error('Missing artist/album');
    return new Promise((resolve, reject) => {
      request
        .get(`http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=${this.lfm}&artist=${artist}&album=${album}&format=json`)
        .end((err, res) => {
          resolve(new albumParse(res.body.album))
          reject(err)
        })
    })
  }
};
