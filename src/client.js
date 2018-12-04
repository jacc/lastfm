const albumParse = require("./parsers/albumParse");
const artistParse = require("./parsers/artistParse");
const albumSearchParse = require('./parsers/albumSearchParse')
const trackSearchParse = require('./parsers/trackSearchParse')
const userInfoParse = require('./parsers/userInfoParse')


const request = require("superagent");

module.exports = class Client {
  /**
   * API keys needed to get information from Last.fm API.
   * @constructor
   * Represents the API keys.
   * @param {string} key - Last.fm API key
   */
  constructor(keys) {
    keys = keys || {};
    this.lfm = keys.key;
  }

  /* Begin album functions */

  /**
   * Get info about an album.
   * Represents the information needed to get info.
   * @param {string} artist - Name of artist
   * @param {string} album - Name of album
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

  /**
   * Get top tags of an album.
   * Represents the information needed to get info.
   * @param {string} artist - Name of artist
   * @param {string} album - Name of album
   */

  /* I have to eventually finish this, I just don't feel like writing the whole album tag parser. */
  // getTopAlbumTags(artist, album) {
  //   if (!artist || !album) throw new Error("Missing artist/album.");
  //   return new Promise((resolve, reject) => {
  //     request
  //       .get(
  //         `http://ws.audioscrobbler.com/2.0/?method=album.tags&api_key=${
  //           this.lfm
  //         }&artist=${artist}&album=${album}&format=json`
  //       )
  //       .end((err, res) => {
  //         resolve(new albumParse(res.body.album));
  //         reject(err);
  //       });
  //   });
  // }

  /**
   * Use Last.fm's album search API.
   * Represents the information needed to get info.
   * @param {string} album - Name of album
   * @param {string} limit {optional} - Limit of albums
   */

  // Actually integrate the {limit} function into the code later.
  searchAlbum(album, limit) {
    if (!album) throw new Error("Missing album.");
    if (!limit) var limit = 30;

    return new Promise((resolve, reject) => {
      request.get(
        `http://ws.audioscrobbler.com/2.0/?method=album.search&album=${album}&api_key=${this.lfm}&format=json`
      );
    });
  }

  /* End album functions */

  /* Begin artist functions */

  // Finish this later, check what needs to be finished
  getArtistInfo(artist) {
    if (!artist) throw new Error("Missing artist.");
    return new Promise((resolve, reject) => {
      request
        .get(
          `http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${artist}&api_key=${
            this.lfm
          }&format=json&limit=${!limit ? 30 : limit}`
        )
        .end((err, res) => {
          resolve(new artistSearchParse(res.body.artist));
          reject(err);
        });
    });
  }

  /* End artist functions */

  /* Begin track functions */


  /** 
   * Search tracks.
   * Represents the information needed to get info.
   * @param {string} artist - Name of artist
   * @param {string} artist - Name of album
   */
  searchTracks(track, artist) {
    if (!artist) console.warn('No artist provided, track selection might not be accurate.')
    return new Promise((resolve, reject) => {
      request.get(`http://ws.audioscrobbler.com/2.0/?method=track.search&track=${track}&api_key=${
        this.lfm
      }&format=json${artist ? `&artist=${artist}` : ''}`)
        .end((err, res) => {
          resolve(new trackSearchParse(res.body))
          reject(err)
        })
    })
  }

  /* End track functions */

  /* Begin user functions */

  getUserInfo(user) {
    if (!user) throw new Error('Missing username.')
    return new Promise((resolve, reject) => {
      request.get(`http://ws.audioscrobbler.com/2.0/?method=user.getinfo&user=${user}&api_key=${this.lfm}&format=json`)
        .end((err, res) => {
          resolve(new userInfoParse(res.body.user))
          reject(err)
        })
    })
  }
};