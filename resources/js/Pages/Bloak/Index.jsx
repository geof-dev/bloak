import {Link, Head, usePage} from '@inertiajs/react';
import ProfileCard from "@/Components/UserPage/ProfileCard.jsx";
import Card from "@/Components/UserPage/Card.jsx";
import {useState} from "react";

export default function Index({ auth, bloak, posts }) {

    return (
        <>
            <Head title={bloak.name}/>
            <header className="grid grid-cols-2 items-center gap-2 py-10 ">
                <div className="flex justify-center">
                    <img className="h-12 w-auto text-white lg:h-16" src="http://localhost/images/bloak-logo.png"/>
                </div>
                <nav className="flex flex-1 justify-center">
                <w3m-button/>
                </nav>
            </header>
            {auth.user ? (
                <div>
                    {/* Elements to show when user is logged in */}
                    <h1>Welcome, User!</h1>
                    {/* Other logged-in content */}
                </div>
            ) : (
                <div>
                    {/* Elements to show when user is not logged in */}
                    <h1>Please login to continue {bloak.name}</h1>
                    {/* Login form or other content */}
                </div>
            )}
            <ProfileCard/>

            <form className="max-w-2xl mt-4 mx-auto">
                <label htmlFor="default-search"
                       className="mb-2 text-sm font-medium text-gray-900 sr-only ">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 " aria-hidden="true"
                             xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input type="search" id="default-search"
                           className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
                           placeholder="Search Mockups, Logos..." required/>
                    <button type="submit"
                            className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 ">Search
                    </button>
                </div>
            </form>

            {posts.map(post => (
                <Card bloak={bloak} key={post.id} title={post.title} timestamp={post.created_at} content={post.content} slug={post.slug} />
            ))}
        </>
    );
}
