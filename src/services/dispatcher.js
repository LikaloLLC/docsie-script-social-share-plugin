import { autobind } from "decorators";
import { DdEvent } from "models";
import { DOM } from "utils";
import Config from "../config";

export class Listener {
  event = "";
  parent = null;
  constructor(event, callback) {
    this.event = event;
    this.callback = callback;
  }
  @autobind
  remove() {
    this.parent.removeEventListener(this.event, this.callback);
  }
}

class DispatcherService {
  _parent = null;
  _cache = {};
  get parent() {
    this._parent = this._parent || DOM.root;
    return this._parent;
  }
  @autobind
  notify(event, detail = {}, cache = false) {
    if (cache) this._cache[event] = detail;
    const e = new CustomEvent(event, { detail });
    this.parent.dispatchEvent(e);
  }
  @autobind
  add(listener) {
    listener.parent = this.parent;
    listener.parent.addEventListener(listener.event, listener.callback);
    this.notify(DdEvent.LISTENER_ADD, {
      event: listener.event,
      app: Config.app.name
    });
    return listener;
  }
  @autobind
  remove(listener) {
    return listener.remove();
  }
}

export default new DispatcherService();
