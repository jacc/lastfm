const client = require("./src/Client");

var lib = new client({
    key: "key"
})

lib.getAlbumInfo('Cher', 'Believe').then(data => {
    console.log(data)
})


lib.getArtistInfo('Cher').then(data => {
    console.log(data)
})

lib.getUserInfo('j9ck').then(data => {
    console.log(data)
})

