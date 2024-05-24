import {FaLock} from "react-icons/fa";

export default function Card({ bloak, post }) {
    return (
        <a href={`${bloak.url}/posts/${post.slug}`}
           className="block p-6 my-4 border border-gray-200 hover:bg-gray-100 max-w-2xl mx-4 sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto bg-white shadow-xl rounded-lg text-gray-900">
            <div className="flex justify-between">
                <h5 className="text-2xl font-bold tracking-tight text-gray-900">{post.title}</h5>
                <FaLock/>
            </div>
            <p className="font-light text-gray-400 mb-2">2 hours ago</p>
            <p className="font-normal text-gray-700 ">{post.content ? post.content.substring(0, 175) + "..." : ''}</p>
        </a>
    );
}
