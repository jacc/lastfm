const albumParse = require("./albumParse.js");
const artistParse = require("./artistParse.js");

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

  /**
   * Represents the information needed to get info.
   * @param {string} artist Name of artist
   * @param {string} artist Name of album
   */
  getAlbumInfo(artist, album) {
    if (!artist || !album) throw new Error("Missing artist/album.");
    return new Promise((resolve, reject) => {
      request
        .get(
          `http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=${
            this.lfm
          }&artist=${artist}&album=${album}&format=json`
        )
        .end((err, res) => {
          resolve(new albumParse(res.body.album));
          reject(err);
        });
    });
  }

  // FINISH
  getArtistInfo(artist) {
    if (!artist) throw new Error("Missing artist.");
    return new Promise((resolve, reject) => {
      request
        .get(
          `http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${artist}&api_key=${
            this.lfm
          }&format=json`
        )
        .end((err, res) => {
          resolve(new artistParse(res.body.artist));
          reject(err);
        });
    });
  }
};
