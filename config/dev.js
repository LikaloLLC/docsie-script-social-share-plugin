// rollup.config.js
// import globals from "rollup-plugin-node-globals";
import includePaths from "rollup-plugin-includepaths";
import commonjs from "rollup-plugin-commonjs";
import nodeResolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";
import sass from "rollup-plugin-sass";
// import postcss from "rollup-plugin-postcss";
import info from "../package.json";
const year = new Date().getFullYear();
const revision = require("child_process")
  .execSync("git rev-parse HEAD")
  .toString().trim();
export default {
  input: info.src,
  output: {
    file: info.main,
    format: "iife",
    banner: "/**@! " + info.description + " v" + info.version + " (build " + revision + ").\n * Copyright (c) Likalo LLC 2017 - " + year + " **/",
  },
  plugins: [
    sass({ insert: true, options: { outputStyle: "compressed" } }),
    // postcss({ plugins: [] }),
    includePaths({
      paths: ["src"],
      extensions: [".js", ".jsx"]
    }),
    babel({
      babelrc: false,
      exclude: "node_modules/**",
      presets: [
        ["env", {
          targets: {
            chrome: 41,
            ie: 11
          },
          "modules": false,
          "useBuiltIns": false,
          "debug": false
        }],
        "stage-0"
      ],
      plugins: ["external-helpers", "transform-decorators-legacy", "transform-class-properties", ["babel-plugin-inferno", { "imports": true }]]
    }),
    commonjs({
      exclude: "node_modules/process-es6/**",
      include: info.externalDependencies
    }),
    // globals(),
    nodeResolve({
      module: true,
      customResolveOptions: {
        moduleDirectory: "node_modules"
      }
    }),
  ]
};