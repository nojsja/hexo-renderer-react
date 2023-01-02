'use strict'

const React = require('react');
const ReactDOMServer = require('react-dom/server');
const babel = require('@babel/core');
const reval = require('eval');

require("@babel/register");

function compile (data, locals, callback) {
  try {
    const js = babel.transform(data.text, { filename: data.path });
    const Component = reval(js.code, data.path, null, true);
    const element = React.createElement(Component.default || Component, locals);
    let markup = ReactDOMServer.renderToStaticMarkup(element);

    if (markup.slice(0, 5).toLowerCase() === '<html') {
      markup = '<!doctype html>\n' + markup;
    }
    callback(markup);
  } catch (error) {
    callback(`hexo-renderer-react2: ${error.toString()}`);
  }
}

compile.disableNunjucks = true;

module.exports = compile;