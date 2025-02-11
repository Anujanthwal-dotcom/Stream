import { Component, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from 'react-hot-toast'
import { Button, TextInput } from 'flowbite-react';
import NavBar from './Components/NavBar.jsx';
import SideBar from './Components/SideBar.jsx';
import MainSection from './Components/MainSection.jsx';
import VideoPlayer from './Components/Sub-Components/VideoPlayer.jsx';
function App() {

  const [authCheck, setAuthCheck] = useState(false);
  const [mainSectionState, setMainSectionState] = useState('home');
  const [user,setUser] = useState(null);

  return (
    <Router>
      <div className='h-screen flex flex-col'>
        <NavBar authCheck={authCheck} user={user} setUser = {setUser} authCheckSetter={setAuthCheck} />
        <div className="flex flex-1" >

          <SideBar state={authCheck} mainSectionStateSetter={setMainSectionState} />

          <Routes>
            <Route path="/" element={<MainSection mainSectionState={mainSectionState} isAuth={authCheck} user={user}/>} />
            <Route path="/watch/:videoId" element={<VideoPlayer />} />
          </Routes>

        </div>
      </div>
    </Router>

  );





  // const [count, setCount] = useState(0);
  // const [video, setVideo] = useState('');
  // const [field, setField] = useState('');

  // (
  // <div className="flex justify-center flex-col items-center space-y-9 content-center">
  //   <h1 className="text-5xl font-semibold fill-slate-900 dark:text-gray-100">
  //     Stream.io
  //   </h1>
  //   <div className='flex flex-row space-x-5'>
  //     <div>
  //       {/* <h1 className='text-white'>Playing video</h1> */}
  //       {/* <video 
  //       controls 
  //       height={500} 
  //       width={500} 
  //       // src={`http://localhost:8080/stream/v1/videos/stream/range/${video}`}
  //       src='http://localhost:8080/stream/v1/videos/4a4d7cd0-d523-4147-a0ab-55177f81d672/master_m3u8'
  //       /> */}

  //       {/* <div className='my-4'>
  //         <TextInput name='Video Id field' placeholder='Enter video id' onChange={(event)=>{setField(event.target.value)}}></TextInput>
  //         <Button name='play' onClick={()=>{setVideo(field)}}>Play</Button>
  //       </div> */}
  //       <div>
  //         <VideoPlayer src={`http://localhost:8080/stream/v1/videos/${video}/master_m3u8`} />
  //       </div>
  //     </div>
  //     <VideoUpload />
  //   </div>


  // <Toaster />
  // </div>
  // )






}

export default App;
