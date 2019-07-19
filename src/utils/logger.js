import { DEBUG } from "./debug";
/**
 * Console logger class
 * 
 * @class Logger
 */
export default class Logger {
  /**
   * Creates an instance of Logger.
   * @param {string} namesapce 
   * @memberof Logger
   */
  constructor(namesapce) {
    this.namesapce = namesapce || "docsie";
  }
  _spitOut(message, type, debugData) {
    if (DEBUG) {
      console[type](`[${this.namesapce} ${type.toUpperCase()}]: ${message}`, ...debugData);
    }
  }
  /**
   * Log informational message
   * 
   * @param {string} message the message to log
   * @param {any} ...debugData additional data for debug
   * @memberof Logger
   */
  info(message, ...debugData) {
    this._spitOut(message, "info", debugData);
  }
  /**
   * Log informational message
   * 
   * @param {string} message the message to log
   * @param {any} ...debugData additional data for debug
   * @memberof Logger
   */
  log(message, ...debugData) {
    this._spitOut(message, "log", debugData);
  }
  /**
   * Log textual message
   * 
   * @param {string} message the message to log
   * @param {any} ...debugData additional data for debug
   * @memberof Logger
   */
  warn(message, ...debugData) {
    this._spitOut(message, "warn", debugData);
  }
  /**
   * Log error message
   * 
   * @param {string} message the message to log
   * @param {any} ...debugData additional data for debug
   * @memberof Logger
   */
  error(message, ...debugData) {
    this._spitOut(message, "error", debugData);
  }
}