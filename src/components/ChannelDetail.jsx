import React, { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import { useParams } from 'react-router-dom'
import { Videos, ChannelCard } from '../components'
import { fetchFromAPI } from '../utils/fetchFromAPI'

const ChannelDetail = () => {
    const { id } = useParams();
    const BASE_URL = 'https://youtube-v31.p.rapidapi.com';
    const [channelDetails, setChannelDetails] = useState(null);
    const [videos, setVideos] = useState([]);

    const options = {
        method: 'GET',
        url: BASE_URL + `/channels?part=snippet&id=${id}`,
        params: {
          maxResults: '50'
        },
        headers: {
          'x-rapidapi-key': process.env.RAPID_API_KEY,
          'x-rapidapi-host': 'youtube-v31.p.rapidapi.com'
        }
    };

    const optionsTwo = {
        method: 'GET',
        url: BASE_URL + `/search?channelId=${id}&part=snippet&order=date`,
        params: {
          maxResults: '50'
        },
        headers: {
          'x-rapidapi-key': process.env.RAPID_API_KEY,
          'x-rapidapi-host': 'youtube-v31.p.rapidapi.com'
        }
    };

    console.log("channelDetails: ", channelDetails);
    console.log("videoDetails: ", videos);

    useEffect(()=>{
        fetchFromAPI(options).then((data)=> setChannelDetails(data?.items[0]));        
    },[id]); 

    useEffect(()=>{
        fetchFromAPI(optionsTwo).then((data)=>setVideos(data?.items));
    },[id])

    return (
        <Box minHeight="95vh">
            <Box>
                <div
                    style={{
                        background: 'linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)',
                        zIndex: 10,
                        height: '300px'
                    }}
                />
                <ChannelCard channelDetail={channelDetails} marginTop="-120px"/>
            </Box>

            <Box display="flex" p="2">
                <Box sx={{ mr: { sm: '100px' } }} />
                <Videos videos={videos}/>
            </Box>
        </Box>
    )
}

export default ChannelDetail