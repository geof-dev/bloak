import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.jsx';
import { Head } from '@inertiajs/react';
import Modal from '@/Components/Modal';
import {useRef, useState} from "react";
import { useForm, router } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';

export default function DashboardPosts({ auth, posts }) {
    const [confirmingPostCreation, setConfirmingPostCreation] = useState(false);
    const titleInput = useRef();

    const {
        data,
        setData,
        post,
        processing,
        reset,
        errors,
    } = useForm({
        title: '',
    });

    const confirmPostCreation = () => {
        setConfirmingPostCreation(true);
    };

    const createPost = (e) => {
        e.preventDefault();

        post(route('dashboard.newPost'), {
            preserveScroll: true,
            onSuccess: (response) => {
                console.log(response)
                /*const postSlug = response.postSlug;
                closeModal();
                console.log(postSlug)
                router.visit(route('dashboard.post', postSlug), {
                    onSuccess: (page) => {
                        // You can perform additional actions after successful navigation if needed
                    },
                    onError: (errors) => {
                        // Handle any errors during navigation
                    },
                });*/
            },
            onError: () => titleInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingPostCreation(false);
        reset();
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />
<div className="px-4 pt-6">
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 pt-6 dark:bg-gray-800">
        <div
            className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700">
            <div className="w-full mb-1">
                <div className="mb-4">

                    <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">All posts</h1>
                </div>
                <div className="sm:flex">
                    <div
                        className="items-center hidden mb-3 sm:flex sm:divide-x sm:divide-gray-100 sm:mb-0 dark:divide-gray-700">
                        <form className="lg:pr-3" action="#" method="GET">
                            <label htmlFor="users-search" className="sr-only">Search</label>
                            <div className="relative mt-1 lg:w-64 xl:w-96">
                                <input type="text" name="email" id="users-search"
                                       className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                       placeholder="Search for posts"/>
                            </div>
                        </form>

                    </div>
                    <div className="flex items-center ml-auto space-x-2 sm:space-x-3">
                        <button onClick={confirmPostCreation} type="button" data-modal-toggle="add-user-modal"
                                className="inline-flex items-center justify-center w-1/2 px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            <svg className="w-5 h-5 mr-2 -ml-1" fill="currentColor" viewBox="0 0 20 20"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd"
                                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                      clipRule="evenodd"></path>
                            </svg>
                            Add post
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div className="flex flex-col">

            <div className="overflow-x-auto">

                <div className="inline-block min-w-full align-middle">

                    <div className="overflow-hidden shadow">
                        <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-600">
                            <thead className="bg-gray-100 dark:bg-gray-700">
                            <tr>
                                <th scope="col"
                                    className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                                    Title
                                </th>
                                <th scope="col"
                                    className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                                    Content
                                </th>
                                <th scope="col"
                                    className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                                    Visibility
                                </th>
                                <th scope="col"
                                    className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                                    Active
                                </th>
                                <th scope="col"
                                    className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                                    Actions
                                </th>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                            {posts.map(post => (
                            <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                                <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    <div className="text-base font-semibold text-gray-900 dark:text-white">
                                        {post.title}
                                    </div>
                                </td>
                                <td className="max-w-sm p-4 overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs dark:text-gray-400">
                                    {post.content ? post.content.substring(0, 50) + "..." : ''}
                                </td>
                                <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">{post.type}</td>
                                <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">{post.active}</td>

                                <td className="p-4 space-x-2 whitespace-nowrap">
                                    <a type="button" id="updateProductButton"
                                       href={`/post/${post.slug}`}
                                            data-drawer-target="drawer-update-product-default"
                                            data-drawer-show="drawer-update-product-default"
                                            aria-controls="drawer-update-product-default" data-drawer-placement="right"
                                            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path>
                                            <path fillRule="evenodd"
                                                  d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                                                  clipRule="evenodd"></path>
                                        </svg>
                                        Update
                                    </a>
                                    <button type="button" id="deleteProductButton"
                                            data-drawer-target="drawer-delete-product-default"
                                            data-drawer-show="drawer-delete-product-default"
                                            aria-controls="drawer-delete-product-default" data-drawer-placement="right"
                                            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:focus:ring-red-900">
                                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd"
                                                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                                  clipRule="evenodd"></path>
                                        </svg>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
            <Modal show={confirmingPostCreation} onClose={closeModal}>
                <form onSubmit={createPost} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Add New Post
                    </h2>

                    <div className="mt-6">
                        <TextInput
                            id="title"
                            type="text"
                            name="title"
                            ref={titleInput}
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            className="mt-1 block w-full"
                            isFocused
                            placeholder="Enter post title"
                        />

                        {errors.title && <div className="text-red-500 mt-2">{errors.title}</div>}
                    </div>

                    <div className="mt-6 flex justify-end">
                        <button onClick={closeModal} className="text-gray-600 px-4 py-2 rounded mr-2">
                            Cancel
                        </button>

                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded" disabled={processing}>
                            {processing ? 'Creating...' : 'Create Post'}
                        </button>
                    </div>
                </form>
            </Modal>
        </AuthenticatedLayout>
    );
}
