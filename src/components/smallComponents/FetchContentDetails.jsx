'use client'

import { useEffect, useState } from 'react';
import request from '@/store/api';
import moment from 'moment';

const FetchContentDetails = ({ videoId }) => {
    const [duration, setDuration] = useState(null)

    useEffect(() => {
        const getContentDetails = async () => {
            const {
                data: { items },
            } = await request('/videos', {
                params: {
                    part: 'contentDetails',
                    id: videoId,
                }
            });
            setDuration(items[0].contentDetails.duration)
        }
        getContentDetails();
    }, []);

    return (
        moment.utc((moment.duration(duration).asSeconds()) * 1000).format("mm:ss")
    )
}

export default FetchContentDetails