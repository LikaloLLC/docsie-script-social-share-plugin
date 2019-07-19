export class DOM {
  /**
 * Parses Docsie data attribute
 * 
 * @export
 * @param {string} data contents of data-hbel attribute string
 * @returns Object parsed options in form of {hbid: "", ...}
 */
  static DataParcer(data) {
    try {
      let options = {};
      let parts = data.trim().split(",");
      for (let i = 0; i < parts.length; i++) {
        let option = parts[i].trim().split(":");
        if (option[0].indexOf("_pk_") > 0) {
          options["key"] = option[0].trim();
          options["doc"] = option[1].trim();
        } else options[option[0].trim()] = ((val) => {
          switch (true) {
            case val === "true": return true;
            case val === "false": return false;
          }
          return val;
        })(option[1].trim().toLowerCase());
      }
      return options;
    } catch (e) {
      return {};
    }
  }
  /**
   * Get document element
   * @static
   * @readonly
   * @returns Document
   * @memberof DOM
   */
  static get document() {
    try {
      return window.document;
    } catch (e) {
      console.error("Could not get document from main window root.", e);
    }
  }
  /**
   * Get document body element
   * @readonly
   * @static
   * @returns Body
   * @memberof DOM
   */
  static get body() {
    try {
      return DOM.document.body;
    } catch (e) {
      console.error("Could not get document body from main window root.", e);
    }
  }
  static get root() {
    try {
      return DOM.element("#DOCSIE__ROOT").pop();
    } catch (e) {
      return undefined;
    }
  }
  /**
   * Find element(s) on page.
   * @static
   * @param {string} filter #filter to search by id, .filter to search by class name, [filter] to search by attribute, or filter to search by tag name
   * @returns Array<Element>
   * @memberof DOM
   */
  static element(filter, el = DOM.document) {
    switch (true) {
      case filter.indexOf("#") === 0:
        return [el.getElementById(filter.substr(1))];
      case filter.indexOf(".") === 0:
        return Array.from(el.getElementsByClassName(filter.substr(1)));
      case filter.indexOf("[") === 0:
        return Array.from(el.querySelectorAll(filter));
      default:
        return Array.from(el.getElementsByTagName(filter));
    }
  }
  /**
   * Retrives Docsie option atribute from an HTMLElement
   * parces it and returnes in a form of an Object
   * @static
   * @param {HTMLElement} el 
   * @returns Object parsed options in form of {hbid: "", ...}
   * @memberof DOM
   */
  static data(el, attr) {
    return DOM.DataParcer(el.dataset[attr]);
  }
  static onElementReady() {
    let element = typeof arguments[0] === "string" ? arguments[0] : "#DOCSIE__ROOT",
      callback = typeof arguments[0] === "function" ? arguments[0] : arguments[1];
    let count = 0, maxCount = 100, timeout = setInterval(() => {
      const docsie = DOM.element(element);
      if (Array.isArray(docsie) && docsie.length > 0) {
        clearInterval(timeout);
        callback(docsie);
      } else if (count > maxCount) {
        clearInterval(timeout);
      }
      count += 1;
    }, 500);
  }
}