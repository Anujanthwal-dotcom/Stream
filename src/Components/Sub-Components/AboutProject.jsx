import React from 'react'
import { Card } from "flowbite-react";
function AboutProject() {
    return (
        <div className="m-6 w-full flex justify-center">
        <Card className="w-full max-w-3xl p-6 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700">
          <h1 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
            About Project
          </h1>
          <div className="mt-4">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Tech Stack:
            </h2>
            <ul className="mt-2 list-disc list-inside space-y-2 text-lg text-gray-800 dark:text-gray-300">
              <li>
                <span className="font-semibold">Backend:</span> Spring Boot and FFmpeg, using HLS protocol for streaming.
              </li>
              <li>
                <span className="font-semibold">Database:</span> MySQL
              </li>
              <li>
                <span className="font-semibold">Frontend:</span> ReactJS and Flowbite
              </li>
              <li>
                <span className="font-semibold">Requests:</span> Axios
              </li>
              <li>
                <span className="font-semibold">Authentication:</span> Firebase
              </li>
            </ul>
            <p className="mt-4 text-lg text-gray-900 dark:text-gray-300">
              The motivation behind this project stems from my fascination with video streaming. 
              I wanted to create a platform where users could share their videos with the world. 
              Unlike hardcoded videos, all content is dynamically requested from the backend.
            </p>
          </div>
        </Card>
      </div>
    )
}

export default AboutProject;