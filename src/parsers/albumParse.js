module.exports = class albumParse {
  constructor(content) {
    this.name = content.name;
    this.artist = content.artist;
    this.url = content.url;
    this.coverArt = content.image[1];
    this.listeners = content.listeners;
    this.playCount = content.playcount;
    this.wikiPublished = content.wiki.published;
    this.wikiContent = content.wiki.summary
  }
}
