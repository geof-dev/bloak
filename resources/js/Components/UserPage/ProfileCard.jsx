import SocialMediaIcon from "@/Components/SocialMediaIcon.jsx";
import getPlatform from '../../Helpers/socialMediaHelper';
import {FaBagShopping} from "react-icons/fa6";
import {FaHubspot, FaNewspaper} from "react-icons/fa";

export default function ProfileCard({bloak}) {
    const socialLinks = bloak.links.split(",").map(link => link.trim());

    return (
        <div className="max-w-2xl mx-4 sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto bg-white shadow-xl rounded-lg text-gray-900">
    <div className="rounded-t-lg h-32 overflow-hidden">
        <img className="object-cover object-top w-full"
             src='https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ'
             alt='Mountain'/>
    </div>

    <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
        <img className="object-cover object-center h-32"
             src='http://localhost/images/empty.png'
             alt='Woman looking front'/>
    </div>
    <div
        className="max-w-2xl -mt-16 mx-4 sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto bg-white text-gray-900 flex justify-center">
        <ul className="py-4 text-gray-700 font-bold flex items-center justify-around w-1/3">
            <li className="flex flex-col items-center justify-around">
                <FaNewspaper />
                <div>20</div>
            </li>
            <li className="flex flex-col items-center justify-between">
                <FaHubspot />
                <div>45</div>
            </li>
            <li className="flex flex-col items-center justify-around">
                <FaBagShopping />
                <div>1</div>
            </li>
        </ul>
        <div className="w-1/3">

        </div>
        <ul className="py-4 text-gray-700 flex items-center justify-around w-1/3">
        </ul>
    </div>
            <div className="text-center mt-2">
        <h2 className="font-semibold">{bloak.name}</h2>
        <p className="text-gray-500">{bloak.headline || ""}</p>
    </div>

    <div className="mt-2 flex flex-col items-center">
        <div className="mb-3 flex space-x-4">
            {socialLinks.map((link, index) => (
                    <a href={link}
                       target="_blank"
                       className="text-sm text-gray-500 transition hover:text-gray-600"
                       rel="noopener noreferrer">
                        <SocialMediaIcon platform={getPlatform(link)} size={26} />
                    </a>
            ))}
        </div>
    </div>

    <div className="p-4 border-t mx-8 mt-2">
        <button
            className="block mx-auto rounded-full bg-blue-900 hover:shadow-lg font-semibold text-white px-6 py-2 flex">
            <p className="">Unlock all private content for</p>
            <div className="flex animate-pulse">
                <p className="mx-1 font-bold ">29.99 MATIC</p>
                <img width="20" className=""
                     src="https://s2.coinmarketcap.com/static/img/coins/64x64/3890.png"/>
            </div>

        </button>
    </div>
        </div>
    );
}
