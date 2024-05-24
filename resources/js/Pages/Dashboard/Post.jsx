import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.jsx';
import { Head } from '@inertiajs/react';
import Modal from '@/Components/Modal';
import {useRef, useState} from "react";
import { useForm, router } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import EditorJS from '@editorjs/editorjs';
import EditorJs from "@/Components/EditorJs";

const INITIAL_DATA = {
    time: new Date().getTime(),
    blocks: [
        {
            type: "header",
            data: {
                text: "This is my awesome editor!",
                level: 1,
            },
        },
    ],
};

export default function DashboardPost({ auth, post }) {
    const [data, setData] = useState(INITIAL_DATA);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard"/>
            <div class="grid grid-cols-1 px-4 pt-6 xl:grid-cols-3 xl:gap-4 dark:bg-gray-900">
                <div class="mb-4 col-span-full xl:mb-2">
                    <h1 class="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">Edit a post</h1>
                </div>
                <div class="col-span-full xl:col-auto">
                    <div
                        class="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
                        <h3 class="mb-4 text-xl font-semibold dark:text-white">General information</h3>
                        <div class="mb-4">
                            <label htmlFor="first-name"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Title
                            </label>
                            <input type="text" name="first-name" id="first-name" value={post.title}
                                   className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                   placeholder="Bonnie" required=""/>
                        </div>
                        <div class="mb-6">
                            <label htmlFor="first-name"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Slug
                            </label>
                            <input type="text" name="first-name" id="first-name" value={post.slug}
                                   className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                   placeholder="Slug" required=""/>
                        </div>
                    </div>
                </div>
                <div class="col-span-2">
                    <div
                        class="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
                        <h3 class="mb-4 text-xl font-semibold dark:text-white">Content</h3>
                        <EditorJs data={data} onChange={setData} editorblock="editorjs-container" />
                    </div>
                </div>

            </div>
        </AuthenticatedLayout>
    );
}
