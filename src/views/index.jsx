import { Component } from "inferno";
import { autobind } from "decorators";
import { SocialShareService } from "services";
import { SocialShare } from "./SocialShare";

export class View extends Component {
    constructor(props) {
        super(props);

        let iconsData = SocialShareService.getIconsData();

        this.state = {
            iconsData
        };
    }
    // @autobind
    // search() {
    //     const results = SearchService.getIconsData();
    //     results &&
    //     this.setState({
    //         showResults: results.length > 0,
    //         results
    //     });
    // }
    // @autobind
    // reset() {
    //     SearchService.reset();
    //     this.setState({
    //         showResults: false,
    //         results: false
    //     });
    // }
    render() {
        const {
            iconsData
        } = this.state;
        return <SocialShare iconsData={iconsData}/>;
        // <div className="docsie-search">
            // {/* <Form results={results && results.length} onReset={this.reset} onSearch={this.search} />
            // <Search showResults={showResults} results={results} /> */}
            
        // {/* </div>; */}
    }
}