'use client'

import React, { useEffect, useState } from "react";
import request from "@/store/api";
import numeral from "numeral";

const FetchStatistics = ({ videoId }) => {
  const [views, setViews] = useState(null);

  useEffect(() => {
    const getContentDetails = async () => {
      const {
        data: { items },
      } = await request("/videos", {
        params: {
          part: "statistics",
          id: videoId,
        },
      });
      setViews(items[0].statistics.viewCount);
    };
    getContentDetails();
  }, []);
  return numeral(views).format("0.a");
};

export default FetchStatistics;
