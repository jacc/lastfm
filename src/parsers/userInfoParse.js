module.exports = class userInfoParse {
    constructor(content) {
        this.username = content.name
        this.playcount = content.playcount
        this.subscriber = content.subscriber = 0 ? true : false
        this.country = content.country
        this.profilePicture = content.image[0]['#text']
        this.playlistCount = content.playlists = 0 ? content.playlists : null
        this.age = content.age = 0 ? content.age : null
        this.registered = content.registered.unixtime
    }
  }
  