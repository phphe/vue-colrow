import {belongsTo, report} from "rogo";
import * as rollup from "rollup";
import * as path from "path";
const babel = require('rollup-plugin-babel');
const node = require("@rollup/plugin-node-resolve");
const cjs = require("@rollup/plugin-commonjs");
const json = require("@rollup/plugin-json");
import { terser } from "rollup-plugin-terser"; // to minify bundle
const vue = require("rollup-plugin-vue");
const postcss = require('rollup-plugin-postcss')
const pkg = require("../package.json")

// quick config
const input = 'src/index.js'
const outDir = 'dist'
const outputName = pkg.name // the built file name is outDir/outputName.format.js
const moduleName = 'vueColrow' // for umd, amd
const extractCssPath = path.resolve(outDir, `${outputName}.css`)

const getBabelConfig = () => ({
  // .babelrc
  presets: [
    ['@vue/cli-plugin-babel/preset', {
      useBuiltIns: false,
      polyfills: [],
    }],
  ],
  plugins: [
    '@babel/plugin-transform-runtime',
    ['@babel/plugin-proposal-optional-chaining', { 'loose': false }],
  ],
  // for rollup babel plugin
  runtimeHelpers: true,
  exclude: [/@babel\/runtime/, /@babel\\runtime/, /regenerator-runtime/],
  extensions: ['.js', '.jsx', '.es6', '.es', '.mjs', '.vue', '.ts', '.tsx'],
  babelrc: false,
})

const esmBabelConfig = <any>getBabelConfig()
esmBabelConfig.presets[0][1]['targets'] = {esmodules: true}

const cjsBabelConfig = <any>getBabelConfig()
cjsBabelConfig.plugins.push(['module-extension', {mjs: 'js'}]) // replace .mjs to .js

const umdBabelConfig = <any>getBabelConfig()

export default <rollup.RollupOptions[]>[
  // esm
  {
    input,
    external: (source) => belongsTo(source, Object.keys(pkg.dependencies||{})) || belongsTo(source, Object.keys(pkg.peerDependencies||{})),
    plugins: [
      postcss({extract: extractCssPath}),
      node(), cjs(), json(),  vue({css: false}),
      babel(esmBabelConfig),
    ],
    output: {
      file: path.resolve(outDir, `${outputName}.esm.js`),
      format: 'esm',
      banner: getBanner(pkg),
      sourcemap: false,
    },
  },
  // cjs
  {
    input,
    external: (source) => belongsTo(source, Object.keys(pkg.dependencies||{})) || belongsTo(source, Object.keys(pkg.peerDependencies||{})),
    plugins: [
      postcss({extract: extractCssPath}),
      node(), cjs(), json(), vue({css: false}),
      babel(cjsBabelConfig),
    ],
    output: {
      file: path.resolve(outDir, `${outputName}.cjs.js`),
      format: 'cjs',
      banner: getBanner(pkg),
      sourcemap: false,
    },
  },
  // umd
  {
    input,
    external: (source) => belongsTo(source, Object.keys(pkg.peerDependencies||{})),
    plugins: [
      postcss({extract: extractCssPath}),
      node(), cjs(), json(), vue({css: false}),
      babel(umdBabelConfig),
    ],
    output: {
      file: path.resolve(outDir, `${outputName}.js`),
      format: 'umd',
      banner: getBanner(pkg),
      sourcemap: false,
      name: moduleName,
    },
  },
  // umd min
  {
    input,
      external: (source) => belongsTo(source, Object.keys(pkg.peerDependencies||{})),
    plugins: [
      postcss({extract: extractCssPath}),
      node(), cjs(), json(), vue({css: false}),
      terser(), // to minify bundle
      babel(umdBabelConfig),
    ],
    output: {
      file: path.resolve(outDir, `${outputName}.min.js`),
      format: 'umd',
      banner: getBanner(pkg),
      sourcemap: false,
      name: moduleName,
    },
  },
]

if (process.argv.includes('--report')) {
  report(outDir)
}

function getBanner(pkg) {
  return `
/*!
 * ${pkg.name} v${pkg.version}
 * (c) ${pkg.author}
 * Released under the ${pkg.license} License.
 */`.trim()
}