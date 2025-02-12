import React, { useEffect, useState } from 'react'
import { Card } from 'flowbite-react';
import axios from 'axios';
import { Link } from 'react-router-dom';
function SavedVideos({ isAuth, user }) {

  const [loadingVideos, setLoadingVideos] = useState(true);
  const [videos, setVideos] = useState([]);

  useEffect(
    () => {
      if (!user) return;
      axios.get("http://localhost:8080/stream/v1/users/savedVideos", { params: { emailId: user.email } }) // Replace with your actual API URL
        .then((response) => {
          console.log(response.data);
          setVideos(response.data);
          setLoadingVideos(false);
        })
        .catch((err) => {
          console.log("error");
        });
    }, []);
  if (!isAuth) {
    return (
      <div className='flex justify-center items-center h-full w-full m-4'>
        <Card className="max-w-lg">
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Please login to view saved videos
          </h5>
        </Card>
      </div>
    )
  }

  else {

    if (loadingVideos) {
      return (
        <div className='m-4 w-full'>
          <h1 className='text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>Saved Videos</h1>
          <h1 className='text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>Loading your videos</h1>
        </div>
      );
    }

    else {
      return (
        <div className='m-4 '>
          <div>
            <h1 className='text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>Your Saved Videos</h1>
          </div>
          <div className='mt-2'>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
              {videos.map((video) => (
                <div key={video.videoId} className="cursor-pointer border rounded-lg shadow-lg p-2">
                  <Link to={`/watch/${video.videoId}`}>
                    <img loading='lazy' className='object-cover rounded-md' src={`http://localhost:8080/stream/v1/videos/get/${video.videoId}/thumbnail`} />
                    <h3 className="text-white" >{video.videoTitle}</h3>
                  </Link>
                </div>
              ))}
            </div>
          </div>

        </div>

      );
    }
  }

}

export default SavedVideos;