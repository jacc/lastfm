module.exports = class artistParse {
  constructor(content) {
    this.name = content.name;
    this.mbid = content.mbid;
    this.url = content.url;
    this.image = content.image[2]
    this.listeners = content.stats.listeners;
    this.playCount = content.stats.playcount;
    this.onTour = content.ontour;
    this.streamable = content.streamable;
    this.bio = content.bio.summary;
    this.published = content.bio.published;
  }
}
