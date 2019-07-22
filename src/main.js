import CSS from "styles/social-share.scss";
import "./polyfills";
import { render } from "inferno";
import { autobind } from "decorators";
import { DdEvent } from "models";
import { DispatcherService, Listener } from "services";
import { DOM } from "utils";
import Config from "./config";

import { View } from "./views";

class main {
  $container = null;
  constructor() {
    const listener = this.listener = new Listener(DdEvent.RENDER, this.onRender);
    DispatcherService.add(listener);
  }
  @autobind
  onRender(e) {
    const $el = e.detail.$el;

    console.log("$el in main(social share plugin)", $el);

    console.log("successfully loaded social-share plugin");

    // if (this.$container) {

    //   this.$container.remove();
      // if ($el) {

        // $el.prepend(this.$container);
      // }
    // } else {

      // for the generic plugn that shares article name, link
      // const container = document.createElement("div");

      // container.setAttribute("class", "docsie-social-share-container");

      // if ($el) {
      //   $el.prepend(this.$container = container);
      // }

      let rootEle = document.getElementById("DOCSIE__ROOT")

      // if (rootEle) {
      //   $el.prepend(this.$container = container);
      // }

      render(
        <View />,
        rootEle
      );
    // }
  }
}

new main();
