import React, { useEffect, useState } from 'react'
import { Box, Stack, Typography } from '@mui/material'
import { Sidebar, Videos } from '../components'
import { fetchFromAPI } from '../utils/fetchFromAPI'


const Feed = () => {
    const [selectedCategory, setSelectedCategory] = useState('New');
    const [videos, setVideos] = useState([]);
    const BASE_URL = 'https://youtube-v31.p.rapidapi.com';

    const options = {
        method: 'GET',
        url: BASE_URL + `/search?part=snippet&q=${selectedCategory}`,
        params: {
          maxResults: '50'
        },
        headers: {
          'x-rapidapi-key': process.env.RAPID_API_KEY,
          'x-rapidapi-host': 'youtube-v31.p.rapidapi.com'
        }
    };

    useEffect(() =>  {
        fetchFromAPI(options).then((data) => {
            if(data && data.items) {
                setVideos(data.items)
            } else {
                console.log("Error: No items found in API response", data)
            }
        })
    }, [selectedCategory])
    
    return (
        <Stack sx={{
            flexDirection: { sx: "column", md: "row"}
        }}>
            <Box sx={{ 
                height: { sx: 'auto', md: '92vh' },
                borderRight: '1px solid #3d3d3d',
                px: { sx: 0, md: 2 }
            }}>
                <Sidebar 
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                />
                <Typography className='copyright' variant='body2' sx={{ mt: 1.5, color: '#fff' }}>
                    Copyright 2025 Youtube
                </Typography>
            </Box>

            <Box p={2} sx={{overflowY: 'auto', height: '90vh', flex: 2}}>
                <Typography variant='h4' fontWeight="bold" mb={2} sx={{color: 'white'}}>
                   {selectedCategory} <span style={{ color: '#F31503'}}>videos</span>
                </Typography>
                <Videos videos={videos}/>
            </Box>
        </Stack>
    )
}

export default Feed