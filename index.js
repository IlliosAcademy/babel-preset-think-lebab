var plugins = {
  //es2015
  'transform-decorators': [require('babel-plugin-transform-decorators')]
};

function extend() {
  var args = [].slice.call(arguments);
  var target = args.shift();
  for(var i=0;i<args.length;i++) {
    for(var k in args[i]) {
      target[k] = args[i][k];
    }
  }
  return target;
}

function preset(context, opts) {
  opts = opts || {};
  var pluginNames = Object.keys(plugins);
  var commonOpts = Object.keys(opts).filter(function(o) {
    return pluginNames.indexOf(o) === -1;
  });

  return {
    plugins: pluginNames.map(function(pluginName) {
      var plugin = plugins[pluginName];
      if( !Array.isArray(plugin) ) {
        plugin = [plugin, {}];
      }

      if(opts[pluginName] === false) {
        return undefined;
      }

      var pluginOpt = plugin[1];
      plugin[1] = extend({}, pluginOpt, commonOpts, opts[pluginName]);
      return plugin;
    }).filter(function(plugin) { return plugin; })
  };
};

module.exports = preset({});

Object.defineProperty(module.exports, 'buildPreset', {
  configurable: true,
  writable: true,
  enumerable: false,
  value: preset,
})
