import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import './FindArtists.css';
import { Container, InputGroup, FormControl, Button, Row, Col, Card, Modal, Spinner } from 'react-bootstrap';
import { guitars } from '../../assets/assets';

const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

const formatDuration = (ms) => {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

const FindArtists = () => {
  const [searchInput, setSearchInput] = useState("The Beatles");
  const [searchQuery, setSearchQuery] = useState("The Beatles");
  const [accessToken, setAccessToken] = useState("");
  const [artist, setArtist] = useState(null);
  const [albums, setAlbums] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [albumTracks, setAlbumTracks] = useState([]);
  const [tracksLoading, setTracksLoading] = useState(false);
  const [tracksError, setTracksError] = useState(false);
  const [configError, setConfigError] = useState(false);

  useEffect(() => {
    if (!CLIENT_ID || !CLIENT_SECRET) {
      setConfigError(true);
      console.error(
        'Missing Spotify credentials. Create a .env file with VITE_SPOTIFY_CLIENT_ID and VITE_SPOTIFY_CLIENT_SECRET (see .env.example).'
      );
      return;
    }

    const authParameters = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`
    };

    fetch('https://accounts.spotify.com/api/token', authParameters)
      .then(result => result.json())
      .then(data => {
        setAccessToken(data.access_token);
      })
      .catch(error => {
        console.error('Error fetching access token:', error);
      });
  }, []);

  // Auto-search as the user types, debounced so we don't hit the API on every keystroke
  useEffect(() => {
    const trimmed = searchInput.trim();
    if (!trimmed) return;

    setIsSearching(true);
    const debounceTimer = setTimeout(() => {
      setSearchQuery(trimmed);
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [searchInput]);

  useEffect(() => {
    if (!accessToken || !searchQuery.trim()) return;

    const artistParameters = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    };

    fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(searchQuery)}&type=artist`, artistParameters)
      .then(response => response.json())
      .then(data => {
        if (data.artists?.items?.length > 0) {
          const artistInfo = data.artists.items[0];
          setArtist({
            name: artistInfo.name,
            image: artistInfo.images[0]?.url,
            popularity: artistInfo.popularity,
            genres: artistInfo.genres,
            spotifyUrl: artistInfo.external_urls ? artistInfo.external_urls.spotify : ''
          });
          return artistInfo.id;
        } else {
          throw new Error('No artist found');
        }
      })
      .then(artistID => {
        return fetch(`https://api.spotify.com/v1/artists/${artistID}/albums?include_groups=album&market=US&limit=50`, artistParameters)
          .then(response => response.json())
          .then(data => data.items.map(item => ({
            id: item.id,
            name: item.name,
            image: item.images[0]?.url,
            artist: item.artists.map(artist => artist.name).join(', '),
            releaseYear: item.release_date.slice(0, 4)
          })));
      })
      .then(albums => {
        setAlbums(albums);
      })
      .catch(error => {
        console.error('Error fetching artist data:', error);
        setArtist(null);
        setAlbums([]);
      })
      .finally(() => {
        setIsSearching(false);
      });
  }, [accessToken, searchQuery]);

  const handleSearch = () => {
    const nextQuery = searchInput.trim();
    if (!nextQuery || !accessToken) return;
    setSearchQuery(nextQuery);
  };

  const openAlbum = (album) => {
    setSelectedAlbum(album);
    setAlbumTracks([]);
    setTracksError(false);

    if (!accessToken) return;

    setTracksLoading(true);
    fetch(`https://api.spotify.com/v1/albums/${album.id}`, {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    })
      .then(response => response.json())
      .then(data => {
        setAlbumTracks(data.tracks?.items || []);
      })
      .catch(error => {
        console.error('Error fetching album tracks:', error);
        setTracksError(true);
      })
      .finally(() => {
        setTracksLoading(false);
      });
  };

  const closeAlbum = () => {
    setSelectedAlbum(null);
    setAlbumTracks([]);
    setTracksError(false);
  };

  const matchedGuitars = useMemo(() => {
    if (!artist?.genres?.length) return [];
    const artistGenres = artist.genres.map(g => g.toLowerCase());
    return guitars
      .filter(guitar => guitar.genres?.some(guitarGenre =>
        artistGenres.some(artistGenre =>
          artistGenre.includes(guitarGenre) || guitarGenre.includes(artistGenre)
        )
      ))
      .slice(0, 3);
  }, [artist]);

  return (
    <div className='find-artists'>
      <h1 className='caption_artists'>Let's Find Your Favourite Artist!</h1>
      <p className='caption_artists_sub'>Just type any artist into Search</p>
      {configError && (
        <Container>
          <p className='config-error'>
            Spotify search is unavailable: missing API credentials. Copy <code>.env.example</code> to{' '}
            <code>.env</code> and add your own Spotify Client ID/Secret.
          </p>
        </Container>
      )}
      <Container>
        <InputGroup className='mb-3'>
          <FormControl
            placeholder='Search for Artist'
            type='text'
            value={searchInput}
            onChange={event => setSearchInput(event.target.value)}
            onKeyDown={event => {
              if (event.key === 'Enter') {
                handleSearch();
              }
            }}
          />
          <Button variant='primary' onClick={handleSearch}>
            Search
          </Button>
        </InputGroup>
        {isSearching && <p className='searching-hint'>Searching…</p>}
      </Container>

      {artist && (
        <Container className='artist-info'>
          <Row className='mb-3 align-items-center'>
            <Col xs={12} md={4} className='text-center'>
              <img src={artist.image} alt={artist.name} className='artist-image'/>
            </Col>
            <Col xs={12} md={8}>
              <h2>{artist.name}</h2>
              <p><b>Popularity:</b> {artist.popularity}</p>
              <p><b>Genres:</b> {artist.genres.join(', ') || '—'}</p>
              <p><b><a href={artist.spotifyUrl} target='_blank' rel='noopener noreferrer'><u>View on Spotify</u></a></b></p>
            </Col>
          </Row>

          {matchedGuitars.length > 0 && (
            <div className='genre-match-box'>
              <p className='genre-match-title'>Guitars that fit {artist.name}'s sound:</p>
              <div className='genre-match-list'>
                {matchedGuitars.map(guitar => (
                  <Link to={`/Guitars/${guitar.id}`} key={guitar.id} className='genre-match-item'>
                    <img src={guitar.image} alt={guitar.title} />
                    <span>{guitar.title}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </Container>
      )}

      <Container className='albums-grid'>
        <Row xs={1} md={2} lg={4} className='g-4'>
          {albums.map((album) => (
            <Col key={album.id}>
              <Card onClick={() => openAlbum(album)}>
                <Card.Img variant='top' src={album.image} alt={album.name} />
                <Card.Body>
                  <Card.Title>{album.name}</Card.Title>
                  <Card.Text>By {album.artist}</Card.Text>
                  <Card.Text>Released: {album.releaseYear}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      <Modal show={!!selectedAlbum} onHide={closeAlbum} centered scrollable>
        <Modal.Header closeButton>
          <Modal.Title>{selectedAlbum?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {tracksLoading && (
            <div className='track-list-loading'>
              <Spinner animation='border' size='sm' /> Loading tracks…
            </div>
          )}
          {!tracksLoading && tracksError && (
            <p>Couldn't load the track list right now. Try again later.</p>
          )}
          {!tracksLoading && !tracksError && albumTracks.length === 0 && (
            <p>No track information available for this album.</p>
          )}
          {!tracksLoading && !tracksError && albumTracks.length > 0 && (
            <ol className='track-list'>
              {albumTracks.map(track => (
                <li key={track.id}>
                  <span className='track-name'>{track.name}</span>
                  <span className='track-duration'>{formatDuration(track.duration_ms)}</span>
                </li>
              ))}
            </ol>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default FindArtists;
