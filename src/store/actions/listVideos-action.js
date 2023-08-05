import { listVideosSliceAction } from '../slices/listVideos-slice';
import request from '../api';

export const fetchVideosData = (endPoint, searchQuery, categoryId, pageToken, prevData, videoId) => {

  const selectParams = () => {
    switch (endPoint) {
      case "/videos":
        if (!pageToken) {
          return {
            part: 'snippet,contentDetails,statistics',
            type: "video",
            chart: 'mostPopular',
          }
        } else {
          return {
            part: 'snippet,contentDetails,statistics',
            type: "video",
            chart: 'mostPopular',
            pageToken: pageToken,
          }
        }
        break;
      case "/search":
        if (searchQuery && !pageToken) {
          return {
            part: 'snippet',
            type: "video",
            q: searchQuery,
          }
        }
        else if (searchQuery && pageToken) {
          return {
            part: 'snippet',
            type: "video",
            q: searchQuery,
            pageToken: pageToken
          }
        }
        else if (categoryId && !pageToken) {
          return {
            part: 'snippet',
            type: "video",
            videoCategoryId: categoryId,
          }
        }
        else if (categoryId && pageToken) {
          return {
            part: 'snippet',
            type: "video",
            videoCategoryId: categoryId,
            pageToken: pageToken
          }
        }
        else if (videoId && !pageToken) {
          return {
            part: 'snippet',
            type: "video",
            relatedToVideoId: videoId
          }
        }
        break;
      case "/videoCategories":
        return {
          part: 'snippet',
        }
      default:
        break;
    }
  }

  return async (dispatch) => {

    const fetchApiData = async () => {
      const params = selectParams()
      const res = await request(`${endPoint}`, {
        params: params
      })
      return res;
    }

    const dispatchVideosData = async () => {
      const res = await fetchApiData();

      switch (endPoint) {
        case "/videos":
          if (!pageToken) {
            res.data.nextPageToken && dispatch(listVideosSliceAction.savePageTokenReducer(res.data.nextPageToken))
            dispatch(listVideosSliceAction.listHomeVideosReducer(res.data.items));
          } else {
            res.data.nextPageToken && dispatch(listVideosSliceAction.savePageTokenReducer(res.data.nextPageToken))
            const res2 = prevData.concat(res.data.items);
            dispatch(listVideosSliceAction.listHomeVideosReducer(res2));
          }
          break;
        case "/search":
          if (searchQuery && !pageToken && !prevData && !videoId) {
            res.data.nextPageToken && dispatch(listVideosSliceAction.savePageTokenReducer(res.data.nextPageToken))
            dispatch(listVideosSliceAction.listSearchVideosReducer(res.data.items))
          }
          else if (searchQuery && pageToken && prevData && !videoId) {
            res.data.nextPageToken && dispatch(listVideosSliceAction.savePageTokenReducer(res.data.nextPageToken))
            let res2 = [res.data.items];
            for (let i = 0; i < prevData.length; i++) {
              res2.push(res2[i].filter(element =>
                prevData[i].id.videoId !== element.id.videoId
              ))
            }
            const res3 = await prevData.concat(res2[prevData.length])
            dispatch(listVideosSliceAction.listSearchVideosReducer(res3))
          }
          else if (categoryId && !pageToken && !prevData && !videoId) {
            res.data.nextPageToken && dispatch(listVideosSliceAction.savePageTokenReducer(res.data.nextPageToken))
            dispatch(listVideosSliceAction.listHomeVideosReducer(res.data.items));
          }
          else if (categoryId && pageToken && prevData && !videoId) {
            res.data.nextPageToken && dispatch(listVideosSliceAction.savePageTokenReducer(res.data.nextPageToken))
            let res4 = [res.data.items];
            for (let i = 0; i < prevData.length; i++) {
              res4.push(res4[i].filter(element =>
                prevData[i].id.videoId !== element.id.videoId
              ))
            }
            const res5 = await prevData.concat(res4[prevData.length])
            dispatch(listVideosSliceAction.listHomeVideosReducer(res5));
          }
          else if (videoId && !pageToken && !prevData) {
            dispatch(listVideosSliceAction.listRelatedVideosReducer(res.data.items))
          }
          break;


        case "/videoCategories":
          dispatch(listVideosSliceAction.listCategoriesReducer(res.data.items))
          break;
        default:
          break;
      }
    }
    dispatchVideosData();
  }
}