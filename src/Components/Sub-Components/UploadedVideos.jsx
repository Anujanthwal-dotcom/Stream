import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
function UploadedVideos({ user }) {

    const [videos, setVideos] = useState([]);
    const [loadingVideos, setLoadingVideos] = useState(true);
    useEffect(
        () => {
            if (!user) return;
            axios.get("http://localhost:8080/stream/v1/users/uploadedVideos", { params: { emailId: user.email } }) // Replace with your actual API URL
                .then((response) => {
                    console.log(response.data);
                    setVideos(response.data);
                    setLoadingVideos(false);
                })
                .catch((err) => {
                    console.log("error");
                });
        }
        ,
        []);



    if (loadingVideos === true) {
        return (
            <div className='w-full'>
                <h1 className='text-white'>hello</h1>
            </div>
        )
    }

    return (
        <div className='m-4 '>
            <div>
                <h1 className='text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>Your Uploaded Videos</h1>
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
    )
}

export default UploadedVideos