"use client";

import React, { useEffect, useState } from "react";
import Suggestions from "@/components/Suggestions";
import EmbededVideo from "@/components/EmbededVideo";
import { useDispatch, useSelector } from "react-redux";
import { fetchVideosData } from "@/store/actions/listVideos-action";
import { remountSliceAction } from "@/store/slices/remount-slice";

function VideoPlayer() {
  //endPoint, searchQuery, categoryId, pageToken, prevData, videoId
  const videoId = useSelector((state) => state.listVideosSlice.videoId);
  const remount = useSelector((state) => state.remountSlice.remountNumber);
  const relaledVideos = useSelector(
    (state) => state.listVideosSlice.listRelatedVideosState
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchVideosData("/search", null, null, null, null, videoId));
  }, [dispatch, remount]);

  return (
    <div
      className="videoPlayer"
      onWheel={() => {
        handleOnWheel();
      }}
    >
      <EmbededVideo />
      <Suggestions />
    </div>
  );
}

export default VideoPlayer;
