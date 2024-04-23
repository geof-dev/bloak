import { Link, Head } from '@inertiajs/react';
import {useState} from "react";

export default function Notfound({ url }) {
    const [name, setName] = useState(url || '');

    const handleChange = (e) => {
        setName(e.target.value);
    };
    return (
        <>
            <Head title="Not Found"/>
            <div className="h-screen w-screen bg-gray-100 flex items-center">
                <div className="container flex flex-col md:flex-row items-center justify-center px-5 text-gray-700">
                    <div className="max-w-md">
                        <div className="text-4xl font-dark font-bold mb-2">Oops! Page not found.</div>
                        <p className="mb-2">But good news! This name Bloak URL is available, and you can claim it if you
                            want. 👇🏽</p>
                        <div class="group relative mt-2 max-w-lg mx-auto">
                            <form>
                                <div class="relative">
                                    <div
                                        class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none text-md font-bold">
                                        bloak.io/
                                    </div>
                                    <input type="search" id="search"
                                           className="block w-full p-4 ps-20 text-md text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-amber-900 focus:border-amber-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                           placeholder="yourname"
                                           value={name}
                                           onChange={handleChange}
                                           required/>
                                    <Link href={route('bloak.create', { url: name })}
                                            className="text-white absolute end-2.5 bottom-2.5 bg-gray-950 hover:bg-amber-900 focus:ring-4 focus:outline-none focus:ring-amber-900 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Claim
                                        your bloak
                                    </Link>
                                </div>
                            </form>
                        </div>
                        <p className="mt-4">If you're looking for an existing page, you might find it with our <Link
                            href={route('homepage')} className="text-blue-500 hover:text-blue-700">amazing discover
                            feature</Link>.</p>

                    </div>
                    <div className="max-w-lg">
                        <img src="http://localhost/images/404.png" alt=""/>
                    </div>

                </div>
            </div>
        </>
    );
}
