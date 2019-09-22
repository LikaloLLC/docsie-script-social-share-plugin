import IconsData from "./data/social-icons";

// import ViewOptionsData from './data/comprehensive-view-options';

const MIN_SEARCH_LENGTH = 3;

// return Icon configurable obj for social-share icons
function getIconsData() {

    // console.log("IconsData returned from service", IconsData.icons);

    return IconsData.icons;
}

// function getViewOptions() {

//     console.log("comprehensive view options data returned from service", ViewOptionsData.fields);

//     return ViewOptionsData.fields;
// }

function getTinyUrl(urlEndpoint, data) {
    
    return fetch(urlEndpoint, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // no-referrer, *client
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
    .then(response => response.json()); // parses JSON response into native JavaScript objects 
}

const SocialShareService = { getIconsData, getTinyUrl }

export default SocialShareService;