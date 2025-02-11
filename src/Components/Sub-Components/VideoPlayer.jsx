import React, { useEffect, useRef, useState } from 'react';
import videojs from 'video.js';
import Hls from 'hls.js';
import 'video.js/dist/video-js.css';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function VideoPlayer() {
    const videoRef = useRef(null);
    const playerRef = useRef(null);
    const { videoId } = useParams();
    const src = `http://localhost:8080/stream/v1/videos/${videoId}/master_m3u8`;
    const [videoMetaData,setVideoMetaData] = useState({title:'',description:''});


    const [isVideoReady, setIsVideoReady] = useState(false); // Track if video is available

    useEffect(() => {
        axios.get(`http://localhost:8080/stream/v1/videos/get/${videoId}`)
            .then((response)=>{
                console.log(response.data);
                setVideoMetaData({title:response.data.videoTitle,description:response.data.description});
            })
            .catch((err)=>{
                console.log(err);
            });


        if (!videoRef.current || isVideoReady) return; // Prevent multiple initializations

        setTimeout(() => {
            if (!videoRef.current) return;

            playerRef.current = videojs(videoRef.current, {
                controls: true,
                autoplay: true,
                muted: true,
                preload: 'auto',
            });

            if (Hls.isSupported()) {
                const hls = new Hls();
                hls.loadSource(src);
                hls.attachMedia(videoRef.current);
                hls.on(Hls.Events.MANIFEST_PARSED, () => {
                    videoRef.current?.play();
                });
            } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
                videoRef.current.src = src;
                videoRef.current.addEventListener('canplay', () => {
                    videoRef.current?.play();
                });
            } else {
                console.log('Video not supported');
                toast.error('Video not supported');
            }

            setIsVideoReady(true); // Mark video as initialized
        }, 0); // Small delay ensures React finishes rendering
    }, [src, isVideoReady]);

    return (
        <div data-vjs-player className="flex flex-row w-full h-screen p-10 space-x-10">
            <div className='w-[60%] h-full' style={{borderRadius:'10px'}}>
                <div className="aspect-video " style={{borderRadius:'10px'}}>
                    <video
                        ref={videoRef}

                        style={{ width: '100%', height: '100%' ,borderRadius:'10px'}}
                        className="absolute top-0 left-0 w-full h-full video-js vjs-control-bar"
                    />
                </div>

            </div>
            <div className=''>
                <h1 className=" text-white  ">Video Info</h1>
                <h1 className=" text-white  ">{videoMetaData.title}</h1>
                <p className=" text-white  ">{videoMetaData.description}</p>
            </div>

        </div>
    );
}

export default VideoPlayer;
