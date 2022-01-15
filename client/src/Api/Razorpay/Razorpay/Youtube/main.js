import React,{useState,useEffect} from 'react';

import youtube from './youtube';
import VideoList from './videoList';
import VideoDetail from './videoDetail';
import { useUserContext } from '../../../../context/userContext';


function Youtube(){
    const [videos,setVideos]=useState([]);
    const {user}=useUserContext();
    const [selectedVideo,setSelectedVideo]=useState(null);

  const  handleVideoSelect = (video) => {
        setSelectedVideo(video);
    }
    useEffect(()=>{
      if(user.topics)
      {
          user.topics.map(async(m) => {
            
            let response = await youtube.get('/search', {
                params: {
                    q:m
                    
                }
          })
          response.data.items.map((m) => { 
          return setVideos(prev=>
              [...prev,m]
          )
      })
    })
    }
    },[])
   
    return (
        <>
        <div>
        <h2 style={{ color: 'black', fontSize: '35px' ,marginTop:"20px"}}>Recommended Youtube Videos</h2>
        </div>  
        <div className='ui container' style={{ marginTop: '2em' }}>
           
            <div className='ui grid'>
                <div className="ui row">
                    <div className="eleven wide column">
                        <VideoDetail video={selectedVideo} />
                    </div>
                    <div className='five wide column'>
                        <VideoList  handleVideoSelect={handleVideoSelect} videos={videos} />
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
export default Youtube;