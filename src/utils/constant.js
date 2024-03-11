export const adsTypeCheck = (type) => {
    switch(type) {
        case 1:
            return 'Google Search';
        case 2:
            return 'Google Shopping';
        case 3:
            return 'Google GDN';
        case 4:
            return 'Facebook Ads';
        case 5:
            return 'Instagram Ads';
        case 6:
            return 'Youtube Ads';
        default:
    };
};