import { Component, createPortal } from "inferno";
import { SocialShareService } from "../services/index";
import { SocialShare } from "./SocialShare";

export default class View extends Component {
    constructor (props) {
        super(props);

        let iconsData = SocialShareService.getIconsData();

        this.state = {
            iconsData
        };
    }

    render() {
        const {
            iconsData
        } = this.state;

        return <SocialShare iconsData={iconsData} socPluginType="generic" />
    }
}