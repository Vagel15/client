import React from "react";
import { Container } from "react-bootstrap";

export default function Login() {
  /* Authorization URL */

  const AUTH_URL =
    "https://accounts.spotify.com/authorize?client_id=815337c7c12145d0b2f068951d428953&response_type=code&redirect_uri=http://localhost:3000/&scope=user-read-email%20user-read-private";

  return (
    <Container
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <img
        src="./logo.png"
        alt="logo"
        style={{
          height: "130px",
          objectFit: "cover",
          transform: "scale(0.5)",
        }}
      ></img>
      <a className="btn btn-success btn-lg" href={AUTH_URL}>
        Login With Spotify
      </a>
    </Container>
  );
}
