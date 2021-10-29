function tableSearch() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("albumSearch");
    filter = input.value.toUpperCase();
    table = document.getElementById("albumTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }       
    }
  }

function completeAlbumDetails () {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  // private methods
  console.log(`<%= blog.album %>%20<%= blog.artist %>`);
  const _getToken = async () => {

      const result = await fetch('https://accounts.spotify.com/api/token', {
          method: 'POST',
          headers: {
              'Content-Type' : 'application/x-www-form-urlencoded', 
              'Authorization' : 'Basic ' + btoa( clientId + ':' + clientSecret)
          },
          body: 'grant_type=client_credentials'
      });

      const data = await result.json();
      // console.log(data);
      return data.access_token;
  }
  const getAlbum = async (albumString) => {

    const token = await _getToken();
    const result = await fetch(`https://api.spotify.com/v1/search?q=${albumString}&type=album&market=US&limit=10`, {
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + token}
    });

    const data = await result.json();
    console.log(data.albums.items[0].external_urls.spotify);
    console.log(data.albums.items[0].images[0].url);
    $( "div.album_link" ).replaceWith( `<a href="${data.albums.items[0].external_urls.spotify}" target="_blank"><%= blog.album %></a>` );
    return data.albums.items[0].external_urls.spotify;
  }

  const getAlbumArt = async (albumString) => {

    const token = await _getToken();
    const result = await fetch(`https://api.spotify.com/v1/search?q=${albumString}&type=album&market=US&limit=10`, {
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + token}
    });

    const data = await result.json();
    console.log(data.albums.items[0].external_urls.spotify);
    console.log(data.albums.items[0].images[0].url);
    $( "div.album_art" ).replaceWith( `<p><img src="${data.albums.items[0].images[0].url}"></p>` );
    return data.albums.items[0].images[0].url;
  }
  getAlbum(`<%= blog.album %>%20<%= blog.artist %>`);
  getAlbumArt(`<%= blog.album %>%20<%= blog.artist %>`);
}