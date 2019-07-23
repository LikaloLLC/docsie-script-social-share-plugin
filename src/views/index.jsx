import { Component, createPortal } from "inferno";
import { autobind } from "decorators";
import { SocialShareService } from "services";
import { SocialShare } from "./SocialShare";
import { ComprehensiveView } from './ComprehensiveView'

export class View extends Component {
    constructor (props) {
        super(props);

        let iconsData = SocialShareService.getIconsData();

        // let results = SocialShareService.search();

        // console.log("results for url append", results);

        let viewOptionsData = SocialShareService.getViewOptions();

        this.state = {
            iconsData,
            viewOptionsData
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
            iconsData,
            viewOptionsData
        } = this.state;

        console.log("document in socialshare jsx file", document);

        let secTitles = document.getElementsByClassName("docsie-section-title");

        // use this to push Icons created using 'createPortal'
        let arr = [];

        // for the custom plugin shown at each section title
        console.log("custom docsie injection found dom elements", secTitles);

        // var list= document.getElementsByClassName("events");
        for (let i = 0; i < secTitles.length; i++) {

            let ele = secTitles[i];

            arr.push(
                <div>
                    {createPortal(<SocialShare iconsData={iconsData} socPluginType="custom" />, ele)}
                </div>
            );
        }

        // for the generic
        let root = document.getElementById("DOCSIE__ROOT");

        const genericIcons = <div class="generic">
            {createPortal(<SocialShare iconsData={iconsData} socPluginType="generic" />, root)}
        </div>

        // for the bottom div comprehensive view
        let comprehensiveView;

        // <div id="comprehensive-view-plugin-container">I command, Appear!</div>

        comprehensiveView = <div>
                    {createPortal(<ComprehensiveView viewOptionsData={viewOptionsData}/>, root)}
                </div>

        // detect page scroll %
        document.addEventListener('scroll', function(){

            var h = document.documentElement, 
                b = document.body,
                st = 'scrollTop',
                sh = 'scrollHeight';
        
            var percent = (h[st]||b[st]) / ((h[sh]||b[sh]) - h.clientHeight) * 100;
            
            // document.getElementById('scroll').textContent = 'scrolled: ' + percent + '%';
            console.log("page % scrolled", percent);

            if (percent > 1.8) {
                console.log("display block");
                document.getElementById("comprehensive-view-plugin-container").style.display = 'block';
                document.getElementById("presentation").style.width = percent+"%";
            } else {
                console.log("display none");
                document.getElementById("comprehensive-view-plugin-container").style.display = 'none';
                document.getElementById("presentation").style.width = percent+"%";
            }
        });

        return <div>{genericIcons}{arr}{comprehensiveView}</div>

    }
}