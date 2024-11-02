const axios = require('axios');
const qs = require('qs');
require('dotenv').config();


const client_id = process.env.SPOTIFY_CLIENT_ID; // Your client id
const client_secret = process.env.SPOTIFY_CLIENT_SECRET; // Your secret
const auth_token = Buffer.from(`${client_id}:${client_secret}`, 'utf-8').toString('base64');

const getAuth = async () => {
  try{
    //make post request to SPOTIFY API for access token, sending relavent info
    const token_url = 'https://accounts.spotify.com/api/token';
    const data = qs.stringify({'grant_type':'client_credentials'});

    const response = await axios.post(token_url, data, {
      headers: { 
        'Authorization': `Basic ${auth_token}`,
        'Content-Type': 'application/x-www-form-urlencoded' 
      }
    })
    console.log('ACCESS TOKEN IS: ' + response.data.access_token);   
    return response.data.access_token;
  }catch(error){
    //on fail, log the error in console
    console.log(error);
  }
}

async function searchPlaylists(mood) {
    const token = await getAuth();
    const response = await fetch(`https://api.spotify.com/v1/search?q=${mood}&type=playlist`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    const data = await response.json();
    console.log(data.playlists.items);
    return data.playlists.items; // Returns array of playlists
}


async function moodToSongs(mood) {
    const token = await getAuth();

    let seedGenre = 'pop';
    let targetEnergy = 0.5;
    let targetValence = 0.5;

    switch(mood){
        case 'happy':
            targetEnergy = 0.8;
            targetValence = 0.9;
            break;
        case 'sad':
            targetEnergy = 0.3;
            targetValence = 0.2;
            break;
    }

    try {
        const response = await axios.get('https://api.spotify.com/v1/recommendations', {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                seed_genres: seedGenre,
                target_energy: targetEnergy,
                target_valence: targetValence,
                limit: 10
            }
        });
        console.log(response.data.tracks);
        return response.data.tracks; 
    } catch (error) {
        console.error("NOPE");
    }
}
