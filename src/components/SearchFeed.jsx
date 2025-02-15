import React, { useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'
import { Videos } from '../components'
import { fetchFromAPI } from '../utils/fetchFromAPI'
import { useParams } from 'react-router-dom'

const SearchFeed = () => {
    const [videos, setVideos] = useState([]);
    const BASE_URL = 'https://youtube-v31.p.rapidapi.com';
    const { searchTerm } = useParams();
    const [isLoading, setIsLoading] = useState(true);

    const options = {
        method: 'GET',
        url: BASE_URL + `/search?part=snippet&q=${searchTerm}`,
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
                setVideos(data.items);
                setIsLoading(false);
            } else {
                console.log("Error: No items found in API response", data);
                console.log(videos);
                setIsLoading(false);
            }
        })
    }, [searchTerm])
    
    return (
        <Box p={2} sx={{overflowY: 'auto', height: '90vh', flex: 2}}>
            {!isLoading ? 
                <>
                    {videos.length>0 ? <>
                        <Typography variant='h4' fontWeight="bold" mb={2} sx={{color: 'white'}}>
                            Search Results for: <span style={{ color: '#F31503'}}>{searchTerm}</span>
                        </Typography>
                        <Videos videos={videos}/>
                    </> : <>
                        <Typography variant='h4' fontWeight="bold" mb={2} sx={{color: 'white'}}>
                            No Results found for: <span style={{ color: '#F31503'}}>{searchTerm}</span>
                        </Typography>
                    </>}
                    
                </> 
                :
                <>
                    <Typography variant='h4' fontWeight="bold" mb={2} sx={{color: 'white'}}>
                        Loading Results for: <span style={{ color: '#F31503'}}>{searchTerm}</span>
                    </Typography>
                </>
            }
        </Box>
    )
}

export default SearchFeed