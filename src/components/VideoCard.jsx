import React from 'react'
import { Card, CardContent, CardMedia, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { CheckCircle } from '@mui/icons-material'
import { demoChannelTitle, demoChannelUrl, demoThumbnailUrl, demoVideoTitle, demoVideoUrl } from '../utils/constants'

const VideoCard = ({ video: { id: { videoId }, snippet } }) => {
    return (
        <Card 
            sx={{
                width: { xs: '100%', sm: '358px', md: '320px', },
                boxShadow: 'none',
                borderRadius: 0
            }}
        >
            <Link to={videoId ? `/video/${videoId}` : demoVideoUrl}>
                <CardMedia 
                    image={snippet?.thumbnails?.high?.url}
                    alt={snippet?.title}
                    sx={{
                        width: { xs: '100%', sm: '358px', md: '320px' },
                        height: 200
                    }}
                />
            </Link>
            <CardContent
                sx={{
                    backgroundColor: '#1e1e1e',
                    height: '106px'
                }}
            >
                <Link to={videoId ? `/video/${videoId}` : demoVideoUrl}>
                    <Typography variant='subtitle1' fontWeight="bold" color="#fff">
                        {snippet?.title.slice(0,60) ||
                        demoVideoTitle.slice(0,60)}
                    </Typography>
                </Link>

                <Link to={snippet?.channelId ? `/channel/${snippet?.channelId}` : demoChannelUrl}>
                    <Typography variant='subtitle2' fontWeight="bold" color="gray">
                        {snippet?.channelTitle.slice(0,60) ||
                        demoChannelTitle.slice(0,60)}
                        <CheckCircle
                            sx={{
                                fontSize: 12,
                                color: 'gray',
                                ml: '5px'
                            }}
                        />
                    </Typography>
                </Link>
            </CardContent>
        </Card>
    )
}

export default VideoCard