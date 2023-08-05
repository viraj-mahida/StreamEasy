"use client";

import s from "@/styles/videosContainer.module.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import moment from "moment";
import numeral from "numeral";
import { fetchVideosData } from "@/store/actions/listVideos-action";
import { listVideosSliceAction } from "@/store/slices/listVideos-slice";
import FetchChannelIcon from "@/components/smallComponents/FetchChannelIcon";
import FetchContentDetails from "@/components/smallComponents/FetchContentDetails";
import FetchStatistics from "@/components/smallComponents/FetchStatistics";
import Image from "next/image";
import loading from '@/styles/loading.module.css'

function VideosContainer() {
  const homeVideosData = useSelector(
    (state) => state.listVideosSlice.listHomeVideosState
  );

  const dispatch = useDispatch();
  const nextPageToken = useSelector((state) => state.listVideosSlice.pageToken);
  const [firstRun, setFirstRun] = useState(true);
  const activeCategory = useSelector(
    (state) => state.listVideosSlice.activeCategory
  );

  const handleOnScroll = () => {
    if (
      firstRun &&
      typeof window !== "undefined" &&
      window.innerHeight + window.pageYOffset + 500 >=
        document.documentElement.scrollHeight
    ) {
      if (activeCategory === 999) {
        dispatch(
          fetchVideosData(
            "/videos",
            null,
            null,
            nextPageToken,
            homeVideosData,
            null
          )
        );
      } else {
        dispatch(
          fetchVideosData(
            "/search",
            null,
            activeCategory,
            nextPageToken,
            homeVideosData,
            null
          )
        );
      }
      setFirstRun(false);
    }
  };

  useEffect(() => {
    setFirstRun(true);
  }, [homeVideosData.length, activeCategory]);

  useEffect(() => {
    if (activeCategory === 999) {
      dispatch(fetchVideosData("/videos", null, null, null, null, null));
    }
  }, [dispatch]);

  useEffect(() => {
    typeof window !== "undefined" &&
      window.addEventListener("scroll", handleOnScroll);

    return () => {
      typeof window !== "undefined" &&
        window.removeEventListener("scroll", handleOnScroll);
    };
  }, [handleOnScroll]);

  return (
    <>
      <div className={s.container} onScroll={handleOnScroll}>
        {homeVideosData &&
          homeVideosData.map((element) => {
            return (
              <div key={element.id.videoId ?? element.id} className={s.card}>
                <Link
                  href="/videoPlayer"
                  className={s.cardLink}
                  onClick={() => {
                    element.contentDetails
                      ? dispatch(
                          listVideosSliceAction.storeVideoIdReducer(element.id)
                        )
                      : dispatch(
                          listVideosSliceAction.storeVideoIdReducer(
                            element.id.videoId
                          )
                        );
                  }}
                >
                  <div className={s.thumbnailAndDuration}>
                    <Image
                      className={s.thumbnailImage}
                      src={`${element.snippet.thumbnails.medium.url}`}
                      alt={element.snippet.title}
                      title={element.snippet.title}
                      width={320}
                      height={180}
                    />
                    <div className={s.durationOverlay}>
                      <span className={s.durationText}>
                        {element.contentDetails ? (
                          moment
                            .utc(
                              moment
                                .duration(element.contentDetails.duration)
                                .asSeconds() * 1000
                            )
                            .format(
                              moment
                                .duration(element.contentDetails.duration)
                                .hours() > 0
                                ? "HH:mm:ss"
                                : "mm:ss"
                            )
                        ) : (
                          <FetchContentDetails videoId={element.id.videoId} />
                        )}
                      </span>
                    </div>
                  </div>

                  <div className={s.channelIconAndTitle}>
                    <div className={s.channelIcon}>
                      <FetchChannelIcon
                        channelId={element.snippet.channelId}
                        title={element.snippet.channelTitle}
                      />
                    </div>

                    <div className={s.titleAndChannelName}>
                      <h4
                        className={s.videoTitle}
                        title={element.snippet.title}
                      >
                        {element.snippet.title.length < 70
                          ? element.snippet.title
                          : element.snippet.title.slice(0, 67) + "..."}
                      </h4>
                      <p className={`${s.viewsAndDate} ${s.smallText}`}>
                        {element.snippet.channelTitle}・
                        {element.statistics ? (
                          numeral(element.statistics.viewCount).format("0.a")
                        ) : (
                          <FetchStatistics videoId={element.id.videoId} />
                        )}{" "}
                        Views・
                        {moment(
                          element.snippet.publishedAt.slice(0, 10)
                        ).fromNow()}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
      </div>
      <div className={loading.loading}>Loading...</div>
    </>
  );
}

export default VideosContainer;
