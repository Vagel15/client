import React from "react";

export default function TrackSearchResult({ track }) {
  return (
    <div className="d-flex m-2 align-items-center">
      <img
        src={track.albumUrl}
        style={{ height: "64px", width: "64px" }}
        alt="cover"
      />
      <div className="ml-3">
        <div style={{ color: "lightgreen" }}>{track.title}</div>
        <div style={{ color: "white" }}>{track.artist}</div>
      </div>
    </div>
  );
}
