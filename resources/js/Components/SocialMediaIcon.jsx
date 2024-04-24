import {FaYoutube, FaFacebook, FaTwitter, FaInstagram, FaTiktok, FaThreads, FaLink, FaPinterest} from 'react-icons/fa6';

const SocialMediaIcon = ({ platform, size }) => {
    switch (platform) {
        case 'youtube':
            return <FaYoutube size={size} />;
        case 'facebook':
            return <FaFacebook size={size} />;
        case 'twitter':
            return <FaTwitter size={size} />;
        case 'instagram':
            return <FaInstagram size={size} />;
        case 'tiktok':
            return <FaTiktok size={size} />;
        case 'threads':
            return <FaThreads size={size} />;
        case 'pinterest':
            return <FaPinterest size={size} />;
        default:
            return <FaLink />;
    }
};

export default SocialMediaIcon;
