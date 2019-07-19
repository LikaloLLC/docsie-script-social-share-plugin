import { DOM } from "utils";

const DECODER = (s) => decodeURIComponent(s.replace(/\+/g, " "));
const SEARCH = /([^&=]+)=?([^&]*)/g;

export class Route {
  static get href() {
    return window.location.href;
  }
  static get base() {
    const base = DOM.document.baseURI || DOM.document.URL;
    return base.replace(Route.location.search, "").replace(Route.location.hash, "");
  }
  static get location() {
    return window.location;
  }
  static get hash() {
    return Route.location.hash.substr(1);
  }
  static get search() {
    return Route.location.search.substr(1);
  }
  static get params() {
    const { search, hash } = Route;
    let match, urlParams = {}, section;
    while ((match = SEARCH.exec(search)))
      urlParams[DECODER(match[1])] = DECODER(match[2]);
    try {
      section = (/section(.*)/.exec(hash))[1];
    } catch (e) { }
    return { ...urlParams, section };
  }
  static Link(params = {}, inherit = true) {
    const uriParams = inherit ? { ...Route.params, ...params } : params;
    let str = Object
      .entries(uriParams)
      .filter(p => p[0] !== "section" && p[1])
      .map(p => p.join("="))
      .join("&");
    if (params.section) str += `#section${params.section}`;
    else str += "#sectionpageheader"
    return Boolean(str) ? `${Route.base}?${str}` : Route.base;
  }
  static Go(url = Route.base) {
    const data = { rand: Math.random() };
    const popStateEvent = new PopStateEvent("pushstate", { state: data });
    window.history.pushState(data, url, url);
    dispatchEvent(popStateEvent);
  }
}
