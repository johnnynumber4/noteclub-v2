const NoteClub = require('../models/NoteClub');
const YoutubeMusicApi = require('youtube-music-api');
const api = new YoutubeMusicApi();
const wiki = require('wikijs').default;

const noteclub_index = (req, res) => {
  NoteClub.find().sort({ createdAt: -1 })
    .then(result => {
      res.render('index', { artist: result, title: 'All music' });
    })
    .catch(err => {
      console.log(err);
    });
}

const noteclub_details = (req, res) => {
  const id = req.params.id;
  NoteClub.findById(id)
    .then(async result => {
      api.initalize() // Retrieves Innertube Config
      .then(async info => {
        api.search(result.album + ' ' + result.artist, "album")
        .then(async resultyt => {
          const ytResultLink = (resultyt.content[0].playlistId);
          const ytThumbnail = (resultyt.content[0].thumbnails[2].url);
          wiki().find(result.album + ' ' + result.artist + ' ' + '(album)')
            .then(async page => {
              await page.summary()
              .then(async wikiDesc => {
                await res.render('details', { blog: result, title: 'Note Club Details', yt: ytResultLink, albumDesc: wikiDesc, albumArt: ytThumbnail });
            })
          })
        })
      });      
    })
    .catch(err => {
      console.log(err);
      res.render('404', { title: 'NoteClub not found' });
    });
}

const noteclub_create_get = (req, res) => {
  res.render('create', { title: 'Add new music' });
}

const noteclub_add_music = (req, res) => {
  const blog = new NoteClub(req.body);
  blog.save()
    .then(result => {
      res.redirect('/noteclub');
    })
    .catch(err => {
      console.log(err);
    });
}

const noteclub_delete = (req, res) => {
  const id = req.params.id;
  NoteClub.findByIdAndDelete(id)
    .then(result => {
      res.json({ redirect: '/noteclub' });
    })
    .catch(err => {
      console.log(err);
    });
}

module.exports = {
  noteclub_index, 
  noteclub_details, 
  noteclub_create_get, 
  noteclub_add_music, 
  noteclub_delete
}