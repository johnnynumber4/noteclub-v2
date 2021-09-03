const fs = require('fs')
const SpotifyWebApi = require('spotify-web-api-node');
const token = "BQBt4A-YVBgJYFNKY_YQbWqeO_PEhhKg2jhttIKnf2i8u0oSHaG5JsYj1ZVHdouA2NhcOmVP8abQSh-GCTiZWBm30JYjiN6dQ2eYFdEHS-M1TqO6hhX_3yCAEVjVKtQg_A7Tp1FtvCAKO2Vp98uUFOJIwgOgjp23vU8RHGbVJQAcFlPKgFvP_ibsS3MY-7a8Wy4O8O78numcV2yDP66Or5Npi1TgsVirsGZYzEVYl_bkw4hE9NGbmW1c2pw57rwvClokHLfupoUq7ABAQalih7ufHQ";

const spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(token);

//GET MY PROFILE DATA
function getMyData() {
  (async () => {
    const me = await spotifyApi.getMe();
    // console.log(me.body);
    getUserPlaylists(me.body.id);
  })().catch(e => {
    console.error(e);
  });
}

//GET MY PLAYLISTS
async function getUserPlaylists(userName) {
  const data = await spotifyApi.getUserPlaylists(userName)

  console.log("---------------+++++++++++++++++++++++++")
  let playlists = []

  for (let playlist of data.body.items) {
    console.log(playlist.name + " " + playlist.id)
    
    let tracks = await getPlaylistTracks(playlist.id, playlist.name);
    // console.log(tracks);

    const tracksJSON = { tracks }
    let data = JSON.stringify(tracksJSON);
    fs.writeFileSync(playlist.name+'.json', data);
  }
}

//GET SONGS FROM PLAYLIST
async function getPlaylistTracks(playlistId, playlistName) {

  const data = await spotifyApi.getPlaylistTracks(playlistId, {
    offset: 1,
    limit: 100,
    fields: 'items'
  })

  console.log('The playlist contains these tracks', data.body);
  console.log('The playlist contains these tracks: ', data.body.items[0].track);
  console.log("'" + playlistName + "'" + ' contains these tracks:');
  let tracks = [];

  for (let track_obj of data.body.items) {
    const track = track_obj.track
    tracks.push(track);
    console.log(track.name + " : " + track.artists[0].name)
  }
  
  console.log("---------------+++++++++++++++++++++++++")
  return tracks;
}

getMyData();