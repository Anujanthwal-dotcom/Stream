import React from 'react'
import { FaHome, FaCog, FaSave } from 'react-icons/fa';
import { Sidebar } from 'flowbite-react';
import { Button } from 'flowbite-react';
import { Link } from 'react-router-dom';
function SideBar({ state, mainSectionStateSetter }) {
    return (
        <Sidebar className="w-64 bg-gray-800 text-white p-4">
            <Sidebar.Items>
                <Sidebar.ItemGroup>

                    {
                        state && (
                            <Button className='w-full mb-3' color='gray'
                                onClick={() => { mainSectionStateSetter('upload') }}
                            >Upload</Button>
                        )
                    }
                    

                    <Link to='/'>
                        <Sidebar.Item className="cursor-pointer" icon={FaHome} onClick={() => { mainSectionStateSetter('home') }}>
                            
                            Home
                        </Sidebar.Item>
                        {/* <Sidebar.Item className="cursor-pointer" icon={FaCog} labelColor="dark" onClick={() => { mainSectionStateSetter('settings') }}>
                            Settings
                        </Sidebar.Item> */}
                        <Sidebar.Item className="cursor-pointer" icon={FaSave} onClick={() => { mainSectionStateSetter('savedVideos') }}>
                            Saved Videos
                        </Sidebar.Item>
                        {state &&
                            (<Sidebar.Item className="cursor-pointer" icon={FaSave} onClick={() => { console.log('uploaded');mainSectionStateSetter('uploadedVideos') }}>
                                Uploaded Videos
                            </Sidebar.Item>)
                        }
                        <Sidebar.Item className="cursor-pointer" icon={FaCog} onClick={() => { mainSectionStateSetter('about') }}>
                            About Project
                        </Sidebar.Item>
                    </Link>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    )
}

export default SideBar