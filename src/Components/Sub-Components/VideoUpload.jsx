import React from 'react'
import VideoLogo from '../../assets/facebook.png'
import { Card, HelperText } from 'flowbite-react'
import { Button } from "flowbite-react";
import { Label } from 'flowbite-react';
import { FileInput } from 'flowbite-react';
import { TextInput } from 'flowbite-react';
import { Textarea } from 'flowbite-react';
import { Progress } from "flowbite-react";
import { Alert } from "flowbite-react";
import axios from 'axios';
import toast from 'react-hot-toast';

function VideoUpload({isAuth, user}) {
    
    const [selectedFile, setSelectedFile] = React.useState(null);
    const [selectedThumbnail, setSelectedThumbnail] = React.useState(null);
    const [progress, setProgress] = React.useState(0);
    const [uploading, setUploading] = React.useState(false);
    const [message, setMessage] = React.useState("");
    const [meta, setMeta] = React.useState({
        title: "",
        description: "",
    });

    function onTitleChange(event) {
        setMeta({ ...meta, title: event.target.value });
    }
    function onDescriptionChange(event) {
        setMeta({ ...meta, description: event.target.value });
    }
    function handleFileUpload(event) {
        setSelectedFile(event.target.files[0]);
    }

    function handleThumbnailUpload(event){
        setSelectedThumbnail(event.target.files[0]);
    }

    function handleFormSubmit(event) {
        event.preventDefault();
        setMeta({
            title: event.target.title.value,
            description: event.target.description.value,
        });
        if (selectedFile === null) {
            alert("Please select a file to upload");
            return;
        }

        //submit file to server
        saveVideoToServer(selectedFile,selectedThumbnail, meta);
    }

    //submit file to server
    async function saveVideoToServer(video,thumbnail, videoMetaData) {
        setUploading(true);

        //api call
        try {
            let formData = new FormData();
            formData.append("title", meta.title);
            formData.append("description", meta.description);
            formData.append("file", video);
            formData.append("thumbnail",thumbnail);
            formData.append("emailId",user.email);
            const response = await axios.post("http://localhost:8080/stream/v1/videos/save", formData, {
                header: {
                    'Content-type': 'multipart/form-data'
                },
                onUploadProgress: (progressEvent) => {
                    setProgress(Math.round((progressEvent.loaded / progressEvent.total) * 100));

                    console.log(progress);
                }
            });
            setMessage("File uploaded successfully");
            toast.success("File uploaded");
        } catch (error) {
            console.log(error);
            setMessage("Failed to upload file");
            toast.error("Failed to upload file");
        }

        //reset
        setUploading(false);
        setProgress(0);
    }


    return (
        <div className="text-white w-full h-screen items-center justify-center flex">
            <Card className='flex flex-col space-y-7 p-4 w-[50%]'>
                <div className='flex justify-center items-center h-full'>
                    <h1 className="text-3xl font-semibold fill-slate-900 dark:text-gray-100">
                        Upload your video
                    </h1>
                </div>

                <form onSubmit={handleFormSubmit} className=" space-y-7 p-4">

                    <div className='flex flex-col space-y-5'>

                        <div>
                            <div>
                                <Label htmlFor="" value="Title" />
                            </div>
                            <TextInput onChange={onTitleChange} id="title" helperText="MAX 100 words" />
                        </div>
                        <div className="max-w-md">
                            <div className="mb-2 block">
                                <Label htmlFor="" value="Description" />
                            </div>
                            <Textarea onChange={onDescriptionChange} id="description" placeholder="Leave a comment..." required rows={4} />
                        </div>
                    </div>

                    <div className="shrink-0 flex space-x-3 items-center">
                        <img
                            className="h-16 w-16 object-cover border-gray-300"
                            src={VideoLogo}
                            alt="Current profile photo"
                        />

                        <div>
                            <HelperText>Upload your video</HelperText>
                            <FileInput onChange={handleFileUpload} id="file-upload-field" />
                        </div>
                        <div>
                            <HelperText>Upload your thumbnail</HelperText>
                            <FileInput onChange={handleThumbnailUpload} id="file-upload-field" />
                        </div>
                    </div>

                    
                    {/* progress bar */}
                    <div className=''>
                        <Progress
                            hidden={!uploading}
                            style={{ width: '100%' }}
                            progress={progress}
                            progressLabelPosition="inside"
                            textLabel=""
                            textLabelPosition="outside"
                            size="lg"
                            labelProgress
                            labelText
                            
                        />
                    </div>
                    
                    {/* //alert message */}
                    <div hidden={(message!=='File uploaded successfully')} className=''>
                        <Alert color='success' rounded withBorderAccent onDismiss={() => setMessage("")}>
                        <span className="font-medium">Video uploaded!</span> {message}<span>. Now Processing it.</span>
                        </Alert>
                    </div>

                    <div hidden={(message!=='Failed to upload file')} className=''>
                        <Alert color='failure' rounded withBorderAccent onDismiss={() => setMessage("")}>
                        <span className="font-medium">Error!</span> {message}
                        </Alert>
                    </div>



                    <div className='flex justify-center items-center h-full'>
                        <Button disabled={uploading} type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Upload
                        </Button>
                    </div>
                </form>
            </Card>

        </div>
    );
}

export default VideoUpload