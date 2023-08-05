'use client'

import React from "react";
import { useSelector } from "react-redux";
import s from '@/styles/embededVideo.module.css'

const EmbededVideo = () => {
  const videoId = useSelector((state) => state.listVideosSlice.videoId);
  typeof window !== 'undefined' && window.localStorage.setItem("videoId", `${videoId}`);

  return (
    <div className={s.embededVideo}>
      {videoId && (
        <iframe
          width="1080"
          height="612"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      )}
    </div>
  );
};

export default EmbededVideo;
