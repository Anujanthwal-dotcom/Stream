import React from 'react';
import { Avatar, Dropdown, Button, Navbar } from "flowbite-react";
import { TextInput } from 'flowbite-react';
import SearchBar from './Sub-Components/SearchBar';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from './Auth/Firebase-config';
import axios from 'axios';
function NavBar({user, setUser, authCheck, authCheckSetter }) {

    

    async function handleLogin() {
        try{
            const result=await signInWithPopup(auth, provider);
            
            setUser(result.user);
            
            /// after getting the user object, I need to save that in backend. Rest backend will handle.
            const formData = new FormData();
            formData.append("emailId",result.user.email);

            const res = await axios.post("http://localhost:8080/stream/v1/users/saveNewUser",formData);
            console.log("User signed in", result.user);
            authCheckSetter(true);
        } catch(error){
            console.error("Error in signing in", error);
        }
    }

    async function handleLogout(){
        authCheckSetter(false);
    }

    return (
        <div>
            {!authCheck ? (
                <Navbar fluid rounded className='justify-around '>
                    <Navbar.Brand>
                        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Stream.io</span>
                    </Navbar.Brand>
                    
                    <div style={{width: '80%'}}>
                        <SearchBar />
                    </div>
                    <div className="">
                        <Button onClick={handleLogin}>Login</Button>
                    </div>
                </Navbar>
            ) : (
                <Navbar fluid rounded>
                    <Navbar.Brand href="https://flowbite-react.com">
                        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Stream.io</span>
                    </Navbar.Brand>
                    <div style={{width: '80%'}}>
                        <SearchBar />
                    </div>

                    <div className="flex md:order-2">
                        <Dropdown
                            arrowIcon={false}
                            inline
                            label={
                                <Avatar alt="User settings" rounded />
                            }
                        >
                            <Dropdown.Header>
                                <span className="block text-sm">{user.displayName}</span>
                            </Dropdown.Header>
                            
                            
                            <Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
                        </Dropdown>
                        <Navbar.Toggle />
                    </div>
                    
                </Navbar>
            )}
        </div>
    );
}

export default NavBar;