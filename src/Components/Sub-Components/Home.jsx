import React from 'react';
import { useState, useEffect } from "react";
import axios from "axios";
import { data, Link } from 'react-router-dom';
import { HiOutlineDotsVertical } from "react-icons/hi"; // Three-dot icon
import { IoClose } from "react-icons/io5"; // Close (✖) icon
function Home({ isAuth, user }) {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedVideo, setSelectedVideo] = useState(null);

    async function handleSavingOfVideos(videoId) {
        if (!user?.email) {
            console.log("User not logged in");
            return;
        }
    
        let formData = new FormData();
        formData.append("emailId", user.email);
        formData.append("videoId", videoId);
    
        try {
            await axios.post("http://localhost:8080/stream/v1/users/saveVideo", formData);
            console.log("Your video is saved");
        } catch (error) {
            console.error("Error saving video:", error);
        } finally {
            setSelectedVideo(null); // Close modal even if an error occurs
        }
    }
    


    useEffect(() => {
        axios.get("http://localhost:8080/stream/v1/videos/getAll")
            .then((response) => {
                console.log(response.data);
                setVideos(response.data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);



    if (loading) return <div className='w-full'><p className='text-white'>Loading...</p></div>;
    if (error) return <p>Error: {error}</p>;
    return (
        <div className='w-full'>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                {videos.map((video) => (
                    <div key={video.videoId} className="cursor-pointer border rounded-lg shadow-lg p-2">

                        <Link to={`/watch/${video.videoId}`}>
                            <img loading='lazy' className='object-cover rounded-md' src={`http://localhost:8080/stream/v1/videos/get/${video.videoId}/thumbnail`} />
                        </Link>


                        {/* Three-dot Menu Icon */}
                        <div className="flex flex-row justify-between mt-2">
                            <h3 className="text-white" >{video.videoTitle}</h3>
                            <button
                                hidden={!isAuth}
                                className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 focus:outline-none"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedVideo(video);
                                }}>
                                <HiOutlineDotsVertical className="text-white text-lg" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {selectedVideo && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-80 text-white relative">
                        {/* Close Button */}
                        <button 
                            className="absolute top-2 right-2 text-2xl text-gray-400 hover:text-white"
                            onClick={() => setSelectedVideo(null)}>
                            <IoClose />
                        </button>

                        <h2 className="text-lg font-bold mb-4">Save this video?</h2>
                        <p>{selectedVideo.videoTitle}</p>

                        {/* Buttons */}
                        <div className="mt-4 flex justify-end">
                            <button 
                                className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-blue-600"
                                onClick={() => handleSavingOfVideos(selectedVideo.videoId)}>
                                Save Video
                            </button>
                            <button 
                                className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                                onClick={() => setSelectedVideo(null)}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Home;