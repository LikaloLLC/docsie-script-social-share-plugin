import { Component, createPortal } from "inferno";
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

        // elemArray = this.props.iconsData.map((icon, i) => {

    //               console.log("icon found in social share plugin", icon);
    //               return <a href={icon.url} className={icon.type} onClick={(e) => this.onClick(e, icon)}><Icon type={icon.type} /></a>
    //             });

    console.log("document in socialshare jsx file", document);

    let secTitles = document.getElementsByClassName("docsie-section-title");

    // use this to push Icons created using 'createPortal'
    let arr = [];

    // for the custom plugin shown at each section title
    console.log("custom docsie injection found dom elements", secTitles);

      // secTitles = [...secTitles];

      // secTitles.forEach((ele, i) => {

      //   console.log("found ele in sectiles", ele, "with index", i);

      //   this.props.iconsData.forEach((icon) => {

      //     console.log("ele in elemArray for icons", ele);
      //     ele.append(<a href={icon.url} className={icon.type} onClick={(e) => this.onClick(e, icon)}><Icon type={icon.type} /></a>);
      //   })
        
      //   console.log("ele after append", ele);

      //   let customDiv = document.createElement("div");

      //   console.log("ele before append", ele);

      //   ele.append(customDiv);

      //   console.log("ele before render", ele);

      //   render(
      //     <View />,
      //     customDiv
      //   );

      //   console.log("ele after render", ele);

      //   // return parent;
      // });

      // var list= document.getElementsByClassName("events");
      for (let i = 0; i < secTitles.length; i++) {

        let ele = secTitles[i];

        arr.push(
            <div>
                {createPortal(<SocialShare iconsData={iconsData}/>, ele)}
            </div>
        );

        // console.log("found ele in sectiles", ele, "with index", i);

        // let iconsInfo = this.props.iconsData;

        

        // for (let j = 0; j < iconsInfo.length; j++) {

        //   let icon = iconsInfo[j];

        //   let ele2 = document.createElement("a");

        //   ele2.setAttribute("href", icon.url);

        //   ele2.setAttribute("class", icon.type);
          
        //   ele2.addEventListener('click',function(e){
        //     this.onClick(e, icon);
        //  });

        //  ele2.innerHTML = icon.type;

        // ele.append(ele2);

        // <a href={icon.url} className={icon.type} onClick={(e) => this.onClick(e, icon)}><Icon type={icon.type} /></a>

        // console.log("ele2 in elemArray for icons appending", ele2);
          
        // }

        // console.log("ele after append", ele);
        // render(
        //   <View />,
        //   ele,
        //   container
        // );
      }
        
      let root = document.getElementById("DOCSIE__ROOT");

      const genericIcons = <div class="generic">
                                {createPortal(<SocialShare iconsData={iconsData}/>, root)}
                            </div>

        return <div>{genericIcons}{arr}</div>
        // <div className="docsie-search">
            // {/* <Form results={results && results.length} onReset={this.reset} onSearch={this.search} />
            // <Search showResults={showResults} results={results} /> */}
            
        // {/* </div>; */}
    }
}