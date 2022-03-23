import React, { useEffect, useState } from "react";
import useAuth from "./useAuth";
import SpotifyWebApi from "spotify-web-api-node";
import TrackSearchResult from "./TrackSearchResult";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

/* Instantiate the wrapper */
const spotifyApi = new SpotifyWebApi({
  clientId: "815337c7c12145d0b2f068951d428953",
});

export default function Dashboard({ code }) {
  const accessToken = useAuth(code);
  const { transcript, listening, resetTranscript } = useSpeechRecognition();
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  /* Check and set accessToken */

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  /* Search */
  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;

    let cancel = false;
    spotifyApi.searchTracks(search).then((res) => {
      if (cancel) return;
      setSearchResults(
        res.body.tracks.items.map((track) => {
          const smallestAlbumImage = track.album.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image;
              return smallest;
            },
            track.album.images[0]
          );

          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImage.url,
          };
        })
      );
    });

    return () => (cancel = true);
  }, [search, accessToken]);

  /* Voice search */
  useEffect(() => {
    if (!transcript) return setSearchResults([]);
    if (!accessToken) return;

    let cancel = false;
    spotifyApi.searchTracks(transcript).then((res) => {
      if (cancel) return;
      setSearchResults(
        res.body.tracks.items.map((track) => {
          const smallestAlbumImage = track.album.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image;
              return smallest;
            },
            track.album.images[0]
          );

          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImage.url,
          };
        })
      );
    });

    return () => (cancel = true);
  }, [transcript, accessToken]);

  return (
    <div className="d-flex flex-column" style={{ height: "100vh" }}>
      <nav
        className="nav-bar d-flex justify-content-flex-start align-items-center"
        style={{ background: "rgba(0, 0, 0, 0.2)" }}
      >
        <img
          src="./logo.png"
          alt="logo"
          style={{
            height: "60px",
            objectFit: "cover",
            transform: "scale(0.60)",
          }}
        ></img>
        <div
          className="search_bar"
          style={{
            border: "none",
            width: "auto",
            borderBottom: "1px solid #2aa549",
            color: "white",
          }}
        >
          <i className="bi bi-search"></i>
          <input
            type="text"
            placeholder="Search Songs/Artists"
            value={transcript || search}
            onChange={(e) => setSearch(e.target.value)}
            onClick={resetTranscript}
            style={{
              border: "none",
              width: "auto",
              background: "transparent",
              padding: ".375rem 0",
              color: "white",
              outline: "none",
              textIndent: "10px",
            }}
          />
          <i
            className={listening ? "bi bi-mic-fill" : "bi bi-mic"}
            style={listening ? { color: "lightgreen" } : { color: "white" }}
            onClick={SpeechRecognition.startListening}
          ></i>
        </div>
      </nav>

      <div
        className="flex-grow-1 my-2 square scrollbar-dusty-grass square thin force-overflow"
        style={{ overflowY: "auto" }}
      >
        {searchResults.map((track) => (
          <TrackSearchResult track={track} key={track.uri} />
        ))}
      </div>
      <div
        className="text-center text-white"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        <div className="container p-4 pb-0 d-flex justify-content-between">
          <section className="mb-4">
            <a
              className="btn btn-outline-light btn-floating m-1"
              href="#!"
              role="button"
            >
              <i className="bi bi-facebook"></i>
            </a>

            <a
              className="btn btn-outline-light btn-floating m-1"
              href="#!"
              role="button"
            >
              <i className="bi bi-twitter"></i>
            </a>

            <a
              className="btn btn-outline-light btn-floating m-1"
              href="#!"
              role="button"
            >
              <i className="bi bi-google"></i>
            </a>

            <a
              className="btn btn-outline-light btn-floating m-1"
              href="#!"
              role="button"
            >
              <i className="bi bi-instagram"></i>
            </a>

            <a
              className="btn btn-outline-light btn-floating m-1"
              href="#!"
              role="button"
            >
              <i className="bi bi-linkedin"></i>
            </a>

            <a
              className="btn btn-outline-light btn-floating m-1"
              href="#!"
              role="button"
            >
              <i className="bi bi-github"></i>
            </a>
          </section>
          <div className="text-center mb-4 d-flex align-items-center">
            Made by Evangelos Karadimas
          </div>
        </div>
      </div>
    </div>
  );
}
