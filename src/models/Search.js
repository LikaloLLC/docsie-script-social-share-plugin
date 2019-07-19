import { convertBlock } from "utils";

export const BlockType = {
    ARTICLE: 3,
    SECTION: 2,
    LIST: 1,
    CODE: 0
  };

export class SearchResultModel {
    relevance = 0;
    query = "";
    text = "";
    sample = "";
    inlineStyleRanges = [];
    url = "";
    constructor(hit, url) {
      Object.assign(this, hit);
      this.sample = convertBlock(this);
      this.relevance = hit.inlineStyleRanges.length + hit.block;
      this.url = url;
    }
  }