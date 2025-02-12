import React from "react";
// needed to be imported to use the useState hook. more work to do here. Setting different components and states for the main section of the app. 
// Building components for the main section of the app.
// all the components are set and ready to be used.
// the main section of the app is the main part of the app where the user will interact with the app.
// the main section of the app will have different components that will be rendered based on the state of the main section.
// the main section of the app will have the following components:
// Home
// Upload
// Settings
// Saved Videos
// the main section of the app will have a state that will be used to determine which component to render.
// the state of the main section will be passed down to the main section component from the app component.
// the main section component will then use the state to determine which component to render.
import Home from "./Sub-Components/Home";
import VideoUpload from "./Sub-Components/VideoUpload";
import SavedVideos from "./Sub-Components/SavedVideos";
import AboutProject from "./Sub-Components/AboutProject";
import UploadedVideos from "./Sub-Components/UploadedVideos";
function MainSection({mainSectionState,isAuth, user}) {
    
    if(mainSectionState === 'home') return <Home isAuth={isAuth} user = {user}/>;
    if(mainSectionState === 'upload') return <VideoUpload isAuth={isAuth} user={user}/>;
    if(mainSectionState === 'savedVideos') return <SavedVideos isAuth={isAuth} user={user}/>;
    if(mainSectionState === 'about') return <AboutProject />;
    if(mainSectionState==='uploadedVideos') return <UploadedVideos user={user}/>;
};

export default MainSection;
