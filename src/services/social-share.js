import { autobind } from "decorators";
import { DdEvent, SearchResultModel } from "models";
import { DispatcherService, Listener } from "services";
import { DOM } from "utils";

import IconsData from "./social-icons";

const MIN_SEARCH_LENGTH = 3;

class SocialShareService {
    constructor() {
        const listener = this.listener = new Listener(DdEvent.INDEX, this.onUpdate);
        this.index = null;
        // this.reset();
        DispatcherService.add(listener);
    }
    // @autobind
    // onUpdate(e) {
    //     debugger;
    //     this.index = e.detail.index || [];
    // }
    // setIndex(index) {
    //     this.index = index;
    // }
    // setQuery(query) {
    //     this.query = query;
    // }
    // returns url used as a link for fb and twitter
    search(query = this.query) {
        const { index } = this;
        if (this.index === null || query.length < MIN_SEARCH_LENGTH) return false;
        this.setQuery(query);
        let results = [];
        if (Boolean(query.trim()))
            index.forEach(block => {
                let r;
                if (r = block.contains(query))
                    results.push(new SearchResultModel(r, block.url));
            });
        return this.results = results
            .sort((a, b) => (b.relevance - a.relevance))
            .filter(r => r.relevance > 1);
    }
    // reset() {
    //     this.query = "";
    //     this.results = [];
    // }

    // return Icon configurable obj for social-share icons
    getIconsData() {

        console.log("IconsData returned from service", IconsData.icons);

        return IconsData.icons;
    }
}

export default new SocialShareService();