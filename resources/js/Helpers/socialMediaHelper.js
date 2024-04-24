// Helpers/socialMediaHelper.js

const getPlatform = (link) => {
    if (link.includes('youtube')) {
        return 'youtube';
    } else if (link.includes('facebook')) {
        return 'facebook';
    } else if (link.includes('twitter')) {
        return 'twitter';
    } else if (link.includes('instagram')) {
        return 'instagram';
    } else if (link.includes('tiktok')) {
        return 'tiktok';
    } else if (link.includes('threads')) {
        return 'threads';
    } else if (link.includes('pinterest')) {
        return 'pinterest';
    } else {
        // Handle other social media platforms if needed
        return '';
    }
};

export default getPlatform;
