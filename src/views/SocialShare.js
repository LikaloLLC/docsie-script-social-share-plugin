import { Component } from "inferno";
import { Icon } from "./Icon";

import { SocialShareService } from "../services/index";

import { tinyUrl } from '../common';

export class SocialShare extends Component {


  constructor(props) {
    super(props);
  }

  onClick(e, icon) {

    // console.log("event click in social -share plugin", e, icon);

    e.preventDefault();
    e.stopPropagation();

    if (icon.type == "twitter") {
      // get the article title
      let titleEle = document.getElementsByTagName("h1");

      let title = titleEle[0].innerHTML;

      // console.log("document.getElementsByTagName('h1')", document.getElementsByTagName('h1'));

      // console.log("social-plugin-container", title);

      // set userName, TODO: update username in the future based on owner of book/article
      // let userName = "Docsie-User";

      // get link 
      let link = window.location.href;

      link = encodeURI(link);

      title = title.replace("#", "%23");

      // concatenate the text that is shared on social media
      let sharedText = "'" + title + "' " + link;

      icon.url = icon.url + sharedText;

    } else if (icon.type == "facebook") {

      // get link 
      let link = window.location.href;

      link = encodeURI(link);

      icon.url = icon.url + link;

    }
    // console.log("updated icon data for navigation in onclick event", icon);

    let data = {
                "longUrl": icon.url
               }

    // update url to tiny url
    SocialShareService.getTinyUrl(tinyUrl, data)
    .then(data => {
                    console.log(data);

                    window.open(icon.url);

    }) // JSON-string from `response.json()` call
    .catch(error => {
      console.error(error);
    });
  }
  
  render() {

    const {
      iconsData,
      socPluginType
    } = this.props;
    return <div className={socPluginType == "generic" ? "docsie-social-share-plugin-gnr" : "docsie-social-share-plugin"} role="list">
      {
        iconsData.map((icon, i) => {

          // console.log("icon found in social share plugin", icon);
          return <div className={socPluginType == "generic" ? "anchor-wrapper-gnr" : "anchor-wrapper"}><a href={icon.url} className={icon.type} onClick={(e) => this.onClick(e, icon)} target="_blank"><Icon type={icon.type} /></a>
          </div>
        })
      }
    </div>;
  }
}
