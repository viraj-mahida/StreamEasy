"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment/moment";
import { fetchVideosData } from "@/store/actions/listVideos-action";
import { listVideosSliceAction } from "@/store/slices/listVideos-slice";
import FetchChannelIcon from "@/components/smallComponents/FetchChannelIcon";
import FetchContentDetails from "@/components/smallComponents/FetchContentDetails";
import FetchStatistics from "@/components/smallComponents/FetchStatistics";
import Link from "next/link";
import Image from "next/image";
import loading from '@/styles/loading.module.css'

const SearchResultsContainer = () => {
  const s =
    typeof window !== "undefined" && window.innerWidth <= 800
      ? require("@/styles/videosContainer.module.css")
      : require("@/styles/searchResults.module.css");
  const remount = useSelector((state) => state.remountSlice.remountNumber);
  const dispatch = useDispatch();
  const searchQuery = useSelector(
    (state) => state.searchQuerySlice.searchQueryState
  );
  const searchResult = useSelector(
    (state) => state.listVideosSlice.listSearchVideosState
  );
  const nextPageToken = useSelector((state) => state.listVideosSlice.pageToken);

  const [firstRun, setFirstRun] = useState(true);

  const handleOnScroll = () => {
    {
      if (
        firstRun &&
        typeof window !== "undefined" &&
        window.innerHeight + window.pageYOffset + 500 >=
          document.documentElement.scrollHeight
      ) {
        dispatch(
          fetchVideosData(
            "/search",
            searchQuery,
            null,
            nextPageToken,
            searchResult,
            null
          )
        );
        setFirstRun(false);
      }
    }
  };

  useEffect(() => {
    setFirstRun(true);
  }, [searchResult.length]);

  useEffect(() => {
    dispatch(fetchVideosData("/search", searchQuery, null, null, null, null));
  }, [dispatch, remount]);

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
      <div
        style={{ margin: "3rem 0 0 0" }}
        className={s.container}
        onScroll={handleOnScroll}
      >
        {searchResult &&
          searchResult.map((element) => {
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
                      {/* <p
                      className={`${s.channelName} ${s.smallText}`}
                      title={element.snippet.channelTitle}
                    >
                      {element.snippet.channelTitle}
                    </p> */}
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
};

export default SearchResultsContainer;
