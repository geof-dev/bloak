import {Link, Head, usePage, useForm} from '@inertiajs/react';
import ProfileCard from "@/Components/UserPage/ProfileCard.jsx";
import Card from "@/Components/UserPage/Card.jsx";
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { router } from '@inertiajs/react'
import { useState } from "react";
import {toast} from "react-toastify";

export default function Create({ auth, bloakFromURL }) {

    const { data, setData, post, errors } = useForm({
        url:  bloakFromURL || '',
        name: '',
    })

    function handleSubmit(e) {
        e.preventDefault()
        post('/create', {
            onSuccess: () => {
                // Handle success scenario, for example, redirect the user
                // For instance, router.reload()
            },
            onError: (error) => {
                toast.error(error.error)
                // Handle error scenario, for example, display error message
                console.error(error.error)
            }
        })
    }

    return (
        <>
            <Head title="Create your Bloak"/>
            <header
                class="relative flex max-w-screen-xl flex-col overflow-hidden px-4 py-4 text-gray-950 md:mx-auto md:flex-row md:items-center">
                <a href="#" className="flex cursor-pointer items-center whitespace-nowrap text-2xl font-black">
                      <span class="mr-2 text-4xl text-amber-900">
                      <img src="/images/bloak-logo.png"
                           alt="Bloak Logo" aria-hidden="true" role="img"
                           style={{maxHeight: '50px'}}
                      />
                      </span>
                    Bloak.io
                </a>
            </header>
            <div className="mx-auto max-w-2xl">
                <form onSubmit={handleSubmit}>
                    <div className="space-y-12">
                        <div className="border-b border-gray-900/10 pb-12">
                            <h2 className="text-base font-semibold leading-7 text-gray-900">Profile</h2>
                            <p className="mt-1 text-sm leading-6 text-gray-600">
                                This information will be displayed publicly so be careful what you share.
                            </p>

                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-4">
                                    <label htmlFor="url"
                                           className="block text-sm font-medium leading-6 text-gray-900">
                                        Your Bloak URL
                                    </label>
                                    <div className="mt-2">
                                        <div
                                            className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                            <span
                                                className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">bloak.io/</span>
                                            <input
                                                type="text"
                                                name="url"
                                                id="url"
                                                autoComplete="url"
                                                value={data.url}
                                                onChange={(e) => setData('url', e.target.value)}
                                                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                placeholder=""
                                            />
                                            {errors.url && <div>{errors.url}</div>}
                                        </div>
                                    </div>
                                </div>

                                <div className="sm:col-span-4">
                                    <label htmlFor="name"
                                           className="block text-sm font-medium leading-6 text-gray-900">
                                        Your Bloak Name
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            autoComplete="name"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                        {errors.name && <div>{errors.name}</div>}
                                    </div>
                                </div>

                                <div className="col-span-full">
                                    <label htmlFor="cover-photo"
                                           className="block text-sm font-medium leading-6 text-gray-900">
                                        Your Wallet
                                    </label>
                                    <w3m-button/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 mb-4 flex items-center justify-end gap-x-6">
                        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
