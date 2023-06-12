const resolve = require("@rollup/plugin-node-resolve").default;
const commonjs = require("@rollup/plugin-commonjs").default;
const typescript = require("@rollup/plugin-typescript").default;
const { terser } = require("rollup-plugin-terser");
const external = require("rollup-plugin-peer-deps-external");
const postcss = require("rollup-plugin-postcss");
const dts = require("rollup-plugin-dts").default;
const json = require("@rollup/plugin-json").default;

const packageJson = {
  main: "dist/cjs/index.js",
  module: "dist/esm/index.js",
  types: "dist/index.d.ts",
};

exports.default = [
  {
    input: "src/index.ts",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: false,
        name: "react-ts-lib",
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: false,
      },
    ],
    plugins: [
      external(),
      json(),
      postcss({}),
      typescript({
        tsconfig: "./tsconfig.json",
      }),
      resolve(),
      commonjs(),
      terser(),
    ],
  },
  {
    input: "dist/esm/types/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    external: [/\.css$/],
    plugins: [dts()],
  },
];
