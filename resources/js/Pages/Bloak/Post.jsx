import {Link, Head, usePage} from '@inertiajs/react';
import ProfileCard from "@/Components/UserPage/ProfileCard.jsx";
import Card from "@/Components/UserPage/Card.jsx";

export default function Post({ auth, bloak, post }) {

    return (
        <>
            <Head title={post.title}/>

        </>
    );
}
