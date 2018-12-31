// use bili to build lib
// vue-cli 3 support build as library, but don't support output as es module because of webpack
const bili = require('bili');
const fs = require('fs');

// fs.renameSync('.babelrc', '.babelrc-back')
bili.write({
  input: './src/lib-entry.js',
  format: ['cjs','umd','umd-min','es'],
  banner: true,
  plugin: ['vue'],
}).then(() => {
  console.log('Done!')
})

// fs.renameSync('.babelrc-back', '.babelrc')
