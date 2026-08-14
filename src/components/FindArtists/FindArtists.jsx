import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import './FindArtists.css';
import { Container, InputGroup, FormControl, Button, Row, Col, Card, Modal, Spinner } from 'react-bootstrap';
import { guitars } from '../../assets/assets';
import AuroraBackground from './AuroraBackground';
import { extractPalette, DEFAULT_PALETTE } from '../../utils/colorExtractor';

const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

const formatDuration = (ms) => {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

const SearchIcon = () => (
  <svg viewBox='0 0 24 24' width='18' height='18' fill='none' stroke='currentColor' strokeWidth='2.2' strokeLinecap='round'>
    <circle cx='11' cy='11' r='7' />
    <line x1='21' y1='21' x2='16.65' y2='16.65' />
  </svg>
);

const SpotifyIcon = () => (
  <svg viewBox='0 0 24 24' width='18' height='18' fill='currentColor'>
    <path d='M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.14 4.32-1.32 9.719-.66 13.439 1.62.361.181.54.78.302 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z' />
  </svg>
);

const FindArtists = () => {
  const [searchInput, setSearchInput] = useState("The Beatles");
  const [searchQuery, setSearchQuery] = useState("The Beatles");
  const [accessToken, setAccessToken] = useState("");
  const [artist, setArtist] = useState(null);
  const [albums, setAlbums] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [palette, setPalette] = useState(DEFAULT_PALETTE);

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

  // Re-derive the page's color palette from the current artist's photo, so the
  // whole page's "mood" shifts live as the user searches for new artists.
  useEffect(() => {
    let cancelled = false;
    extractPalette(artist?.image).then(colors => {
      if (!cancelled) setPalette(colors);
    });
    return () => {
      cancelled = true;
    };
  }, [artist?.image]);

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

  const paletteStyle = {
    '--p1': palette[0],
    '--p2': palette[1],
    '--p3': palette[2],
    '--p4': palette[3],
  };

  return (
    <div className='find-artists' style={paletteStyle}>
      <AuroraBackground colors={palette} />

      <div className='find-artists-content'>
        <div className='fa-hero'>
          <span className='fa-eyebrow'>Powered by Spotify</span>
          <h1 className='caption_artists'>
            Let's Find Your <span className='fa-gradient-text'>Favourite Artist</span>
          </h1>
          <p className='caption_artists_sub'>Just type any artist into Search — the vibe follows them.</p>
        </div>

        {configError && (
          <Container>
            <p className='config-error'>
              Spotify search is unavailable: missing API credentials. Copy <code>.env.example</code> to{' '}
              <code>.env</code> and add your own Spotify Client ID/Secret.
            </p>
          </Container>
        )}

        <Container>
          <div className='fa-search-wrap'>
            <InputGroup className='fa-search-group mb-3'>
              <span className='fa-search-icon'><SearchIcon /></span>
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
              <Button variant='primary' className='fa-search-btn' onClick={handleSearch}>
                Search
              </Button>
            </InputGroup>
          </div>
          {isSearching && <p className='searching-hint'><span className='fa-pulse-dot' />Searching…</p>}
        </Container>

        {artist && (
          <Container className='artist-info'>
            <div className='fa-artist-card'>
              <Row className='mb-3 align-items-center g-4'>
                <Col xs={12} md={4} className='text-center'>
                  <div className='fa-artist-image-wrap'>
                    <img src={artist.image} alt={artist.name} className='artist-image' />
                  </div>
                </Col>
                <Col xs={12} md={8}>
                  <h2 className='fa-artist-name'>{artist.name}</h2>

                  <div className='fa-popularity'>
                    <span className='fa-popularity-label'>Popularity</span>
                    <div className='fa-popularity-bar'>
                      <div className='fa-popularity-fill' style={{ width: `${artist.popularity}%` }} />
                    </div>
                    <span className='fa-popularity-value'>{artist.popularity}</span>
                  </div>

                  {artist.genres.length > 0 && (
                    <div className='fa-genres'>
                      {artist.genres.map((genre, index) => (
                        <span
                          key={genre}
                          className='fa-genre-pill'
                          style={{ '--pill-color': palette[index % palette.length] }}
                        >
                          {genre}
                        </span>
                      ))}
                    </div>
                  )}

                  <a href={artist.spotifyUrl} target='_blank' rel='noopener noreferrer' className='fa-spotify-btn'>
                    <SpotifyIcon /> View on Spotify
                  </a>
                </Col>
              </Row>
            </div>

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
          {albums.length > 0 && <h3 className='fa-section-title'>Discography</h3>}
          <Row xs={1} md={2} lg={4} className='g-4'>
            {albums.map((album) => (
              <Col key={album.id}>
                <Card className='fa-album-card' onClick={() => openAlbum(album)}>
                  <div className='fa-album-img-wrap'>
                    <Card.Img variant='top' src={album.image} alt={album.name} />
                    <div className='fa-album-overlay'>
                      <span className='fa-play-badge'>▶</span>
                    </div>
                  </div>
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

        <Modal show={!!selectedAlbum} onHide={closeAlbum} centered scrollable className='fa-modal'>
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
    </div>
  );
};

export default FindArtists;
