// Rollup plugins.
import uglify from "rollup-plugin-uglify";

// Import the development configuration.
import config from "./dev";

// Inject the production settings.
config.output.intro = "window[\"process\"]={env:{NODE_ENV:\"production\"}}";
config.output.sourcemap = false;
config.plugins.push(uglify({
  output: {
    comments: function (node, comment) {
      var text = comment.value;
      var type = comment.type;
      if (type == "comment2") {
        // multiline comment
        return /@!/i.test(text);
      }
    }
  }
}));

export default config;
