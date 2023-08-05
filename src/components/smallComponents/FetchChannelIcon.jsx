'use client'

import React, { useEffect, useState } from "react";
import request from "@/store/api";
import Image from "next/image";
import s from '@/styles/videosContainer.module.css'

const FetchChannelIcon = ({ channelId, title }) => {
  const [channelIcon, setChannelIcon] = useState(null);

  useEffect(() => {
    const getChannelIcon = async () => {
      const {
        data: { items },
      } = await request("/channels", {
        params: {
          part: "snippet",
          id: channelId,
        },
      });
      setChannelIcon(items[0].snippet.thumbnails.default.url);
    };
    getChannelIcon();
  }, []);


  return (
    <Image
      className={s.homeVideosChannelIcon}
      src={`${channelIcon !== null ? channelIcon : '/channelIcon.png'}`}
      alt=""
      width={50}
      height={50}
      title={title}
    />
  );
};

export default FetchChannelIcon;
