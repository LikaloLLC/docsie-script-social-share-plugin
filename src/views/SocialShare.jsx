import { Component } from "inferno";
import { autobind } from "decorators";
import { Route } from "utils";
import { Icon } from "./Icon";

export class SocialShare extends Component {
  @autobind
  onClick(e, icon) {

    console.log("event click in social -share plugin", e, icon);

    e.preventDefault();
    e.stopPropagation();

    if (icon.type == "twitter") {
      // get the article title
      let titleEle = document.getElementsByTagName("h1");

      let title = titleEle[0].innerHTML;

      console.log("document.getElementsByTagName('h1')", document.getElementsByTagName('h1'));

      // console.log("social-plugin-container", title);

      // set userName, TODO: update username in the future based on owner of book/article
      // let userName = "Docsie-User";

      // get link 
      let link = window.location.href;

      link = encodeURI(link);

      // concatenate the text that is shared on social media
      let sharedText = "'" + title + "'" + link;

      icon.url = icon.url + sharedText;

    } else if (icon.type == "facebook") {

      // get link 
      let link = window.location.href;

      link = encodeURI(link);

      icon.url = icon.url + link;

    }
    console.log("updated icon data for navigation in onclick event", icon);

    Route.Go(icon.url);
  }
  
  render() {

    let elemArray = [];

    // // elemArray = this.props.iconsData.map((icon, i) => {

    // //               console.log("icon found in social share plugin", icon);
    // //               return <a href={icon.url} className={icon.type} onClick={(e) => this.onClick(e, icon)}><Icon type={icon.type} /></a>
    // //             });

    // console.log("document in socialshare jsx file", document);

    // let secTitles = document.getElementsByClassName("docsie-section-title");

    // // for the custom plugin shown at each section title
    // console.log("custom docsie injection found dom elements", secTitles);

    //   // secTitles = [...secTitles];

    //   // secTitles.forEach((ele, i) => {

    //   //   console.log("found ele in sectiles", ele, "with index", i);

    //   //   this.props.iconsData.forEach((icon) => {

    //   //     console.log("ele in elemArray for icons", ele);
    //   //     ele.append(<a href={icon.url} className={icon.type} onClick={(e) => this.onClick(e, icon)}><Icon type={icon.type} /></a>);
    //   //   })
        
    //   //   console.log("ele after append", ele);

    //   //   let customDiv = document.createElement("div");

    //   //   console.log("ele before append", ele);

    //   //   ele.append(customDiv);

    //   //   console.log("ele before render", ele);

    //   //   render(
    //   //     <View />,
    //   //     customDiv
    //   //   );

    //   //   console.log("ele after render", ele);

    //   //   // return parent;
    //   // });

    //   // var list= document.getElementsByClassName("events");
    //   for (let i = 0; i < secTitles.length; i++) {

    //     let ele = secTitles[i];

    //     console.log("found ele in sectiles", ele, "with index", i);

    //     let iconsInfo = this.props.iconsData;

        

    //     for (let j = 0; j < iconsInfo.length; j++) {

    //       let icon = iconsInfo[j];

    //       let ele2 = document.createElement("a");

    //       ele2.setAttribute("href", icon.url);

    //       ele2.setAttribute("class", icon.type);
          
    //       ele2.addEventListener('click',function(e){
    //         this.onClick(e, icon);
    //      });

    //      ele2.innerHTML = icon.type;

    //     ele.append(ele2);

    //     // <a href={icon.url} className={icon.type} onClick={(e) => this.onClick(e, icon)}><Icon type={icon.type} /></a>

    //     console.log("ele2 in elemArray for icons appending", ele2);
          
    //     }

    //     console.log("ele after append", ele);
    //   }

    const {
      iconsData,
      // socPluginType
    } = this.props;
    return <div className="docsie-social-share-plugin" role="list">
      {
        iconsData.map((icon, i) => {

          console.log("icon found in social share plugin", icon);
          return <div className="anchor-wrapper"><a href={icon.url} className={icon.type} onClick={(e) => this.onClick(e, icon)}><Icon type={icon.type} /></a>
          {/* {socPluginType == "generic" ? <br /> : ''} */}
          </div>
        })
      }
    </div>;
  }
}
