export default function Card({ bloak, title, timestamp, content, slug }) {
    return (
        <a href={`${bloak.url}/posts/${slug}`}
           className="block p-6 my-4 border border-gray-200 hover:bg-gray-100 max-w-2xl mx-4 sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto bg-white shadow-xl rounded-lg text-gray-900">
            <h5 className=" text-2xl font-bold tracking-tight text-gray-900">{title}</h5>
            <p className="font-light text-gray-400 mb-2">{timestamp}</p>
            <p className="font-normal text-gray-700 ">Here are the biggest enterprise technology
                acquisitions of 2021 so far, in reverse chronological order.</p>
        </a>
    );
}
