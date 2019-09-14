import IconsData from "./data/social-icons";

// import ViewOptionsData from './data/comprehensive-view-options';

const MIN_SEARCH_LENGTH = 3;

// return Icon configurable obj for social-share icons
function getIconsData() {

    console.log("IconsData returned from service", IconsData.icons);

    return IconsData.icons;
}

// function getViewOptions() {

//     console.log("comprehensive view options data returned from service", ViewOptionsData.fields);

//     return ViewOptionsData.fields;
// }

const SocialShareService = { getIconsData }

export default SocialShareService;