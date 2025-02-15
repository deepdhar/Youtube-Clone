import { CheckCircle } from '@mui/icons-material'
import { Box, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player'
import { Link, useParams } from 'react-router-dom'
import { fetchFromAPI } from '../utils/fetchFromAPI'
import { Videos } from './';


const VideoDetail = () => {
    const { id } = useParams();
    const [videoDetail, setVideoDetail] = useState(null);
    const [videos, setVideos] = useState(null);
    const BASE_URL = 'https://youtube-v31.p.rapidapi.com';

    const options = {
        method: 'GET',
        url: BASE_URL + `/videos?part=snippet,statistics&id=${id}`,
        params: {
          maxResults: '50'
        },
        headers: {
          'x-rapidapi-key': "75d63a043amsh4691e7c57fb6710p106be8jsnec042fada122",
          'x-rapidapi-host': 'youtube-v31.p.rapidapi.com'
        }
    };

    const optionsTwo = {
        method: 'GET',
        url: BASE_URL + `/search?part=snippet&relatedToVideoId=${id}&type=video`,
        params: {
          maxResults: '50'
        },
        headers: {
          'x-rapidapi-key': "75d63a043amsh4691e7c57fb6710p106be8jsnec042fada122",
          'x-rapidapi-host': 'youtube-v31.p.rapidapi.com'
        }
    };

    useEffect(() => {
        fetchFromAPI(options).then((data) => setVideoDetail(data.items[0]));
        fetchFromAPI(optionsTwo).then((data) => setVideos(data.items));
    },[id])

    if(!videoDetail?.snippet || !videos) return (
        <Box minHeight="95vh">
            <Typography color='#fff' variant='h4' fontWeight="bold" p={2}>
                Video Loading...
            </Typography>
        </Box>
    );

    const { snippet: { title, channelId, channelTitle }, statistics: { viewCount, likeCount } } = videoDetail;

    return (
        <Box minHeight="95vh">
            <Stack direction={{ xs: 'column', md: 'row' }}>
                <Box flex={1}>
                    <Box sx={{ width: '100%', position: 'sticky', top: '86px' }}>
                        <ReactPlayer url={`https://www.youtube.com/watch?v=${id}`}
                            classname="react-player" controls width='100%' height='500px'
                        />
                        <Typography color='#fff' variant='h5' fontWeight="bold" p={2}>
                            {title}
                        </Typography>
                        <Stack
                            direction="row" justifyContent="space-between"
                            sx={{ color: '#fff' }} py={1} px={2}
                        >
                            <Link to={`/channel/${channelId}`}>
                                <Typography variant={{ sm: 'subtitle1', md: 'h6' }} color="#fff">
                                    {channelTitle}
                                    <CheckCircle sx={{fontSize: '12px', color: 'gray', ml: '5px'}}/>
                                </Typography>
                            </Link>
                            <Stack direction="row" gap="20px" alignItems='center'>
                                <Typography variant='body1' sx={{ opacity: 0.7 }}>
                                    {parseInt(viewCount).toLocaleString()} views
                                </Typography>
                                <Typography variant='body1' sx={{ opacity: 0.7 }}>
                                    {parseInt(likeCount).toLocaleString()} likes
                                </Typography>
                            </Stack>
                        </Stack>
                    </Box>
                </Box>

                <Box px={2} py={{md: 1, xs: 5}} justifyContent='center' alignItems='center'>
                <Videos videos={videos} direction="column"/>
            </Box>
            </Stack>
        </Box>
    )
}

export default VideoDetail