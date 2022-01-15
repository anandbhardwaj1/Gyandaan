import React from "react";
import "./video.css";

const VideoDetail = ({ video }) => {
  if (!video) {
    return (
      <div style={{color:"black"}}>
       
        <p style={{ fontSize: '25px'}}>
          Select a video to watch
        </p>
      </div>
    )
  }

const videoSrc = `https://www.youtube.com/embed/${video.id.videoId}`;
console.log(typeof video);
return (
  <div>
    <div className="ui embed">
      <iframe src={videoSrc} allowFullScreen title="Video player" />
    </div>
    <div className="ui segment">
      <h4 className="ui header">{video.snippet.title}</h4>
      <p>{video.snippet.description}</p>
    </div>
  </div>
);
};

export default VideoDetail;