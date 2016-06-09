/* jshint node: true */
'use strict';

var funnel = require('broccoli-funnel');
var mergeTrees = require('broccoli-merge-trees');

var WriteMixins = require('./broccoli-component-mixins');
var WriteComponentImports = require('./broccoli-auto-import-components');

var COMPONENTS_GLOB = 'components/*.scss';

module.exports = function(tree) {
  var componentScssTree = new WriteMixins(funnel(tree, {
    include: [ COMPONENTS_GLOB ]
  }));

  var addonScssTree = new WriteComponentImports(tree, {
    main: 'addon.scss',
    components: COMPONENTS_GLOB
  });

  return mergeTrees([tree, componentScssTree, addonScssTree], { overwrite: true });
};