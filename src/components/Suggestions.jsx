"use client"

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment/moment";
import { listVideosSliceAction } from "@/store/slices/listVideos-slice";
import FetchChannelIcon from "@/components/smallComponents/FetchChannelIcon";
import FetchContentDetails from "@/components/smallComponents/FetchContentDetails";
import FetchStatistics from "@/components/smallComponents/FetchStatistics";
import Link from "next/link";
import s from "@/styles/videosContainer.module.css";
import Image from "next/image";
import { remountSliceAction } from "@/store/slices/remount-slice";
import ss from '@/styles/suggestions.module.css'

function Suggestions() {
  const dispatch = useDispatch();
  const relaledVideos = useSelector(
    (state) => state.listVideosSlice.listRelatedVideosState
  );

  return (
    <div className={ss.suggestions}>
      <h1 className={ss.relatedVideosTitle}>Related Videos</h1>
      <div
        className={`${s.container} ${ss.container}`}
        style={{
          marginTop: "0"
        }}
      >
        {relaledVideos &&
          relaledVideos.map((element) => {
            return (
              <div key={element.id.videoId ?? element.id} className={s.card}>
                <div
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
                    dispatch(remountSliceAction.updateRemountNumber());
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
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Suggestions;
