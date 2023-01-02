/* eslint-env mocha */
'use strict'

const join = require('path').join
const compile = require('../lib/compile')

const TEMPLATE_PATH = join(__dirname, 'template.jsx')

const compileWithPromise = (data, locals = {}) => {
  return new Promise((resolve) => {
    compile(data, locals, (res) => {
      resolve(res);
    });
  });
};

describe('hexo-renderer-react/lib/compile', () => {
  it('returns function to render html strings', (callback) => {
    const template = `
      var React = require('react');
      var createReactClass = require('create-react-class');
      module.exports = createReactClass({
        render: function () {
          return React.createElement('div', { className: 't1' }, 'test');
        },
      });
    `;

    compileWithPromise({ text: template, path: TEMPLATE_PATH }).then((compiled) => {
      if (compiled !== '<div class="t1">test</div>') {
        callback('failed');
      } else {
        callback();
      }
    });

  });

  it('handles es6 and jsx', (callback) => {
    const template = `
      import React from 'react';
      export default () => <div className="t1">test</div>;
    `;

    compileWithPromise({ text: template, path: TEMPLATE_PATH }).then((rendered) => {
      if (rendered !== '<div class="t1">test</div>') {
        callback('failed');
      } else {
        callback();
      }
    });

  });

  it('prepends doctype if top node is html', (callback) => {
    const template = `
      import React from 'react';
      export default () => <html>test</html>;
    `;

    compileWithPromise({ text: template, path: TEMPLATE_PATH }).then((rendered) => {
      if (rendered !== '<!doctype html>\n<html>test</html>') {
        callback('failed');
      } else {
        callback();
      }
    });

  });

  it('handles imported components', (callback) => {
    const template = `
      import React from 'react';
      import Html from './html.jsx';
      export default () => <Html>test</Html>;
    `;

    compileWithPromise({ text: template, path: TEMPLATE_PATH }).then((rendered) => {
      if (rendered !== '<!doctype html>\n<html>test</html>') {
        callback('failed');
      } else {
        callback();
      }
    });

  });

  it('passes locals as props', (callback) => {
    const template = `
      import React from 'react'
      export default (props) =>
        <div>{props.message}</div>
    `;

    compileWithPromise({ text: template, path: TEMPLATE_PATH }, {
      message: 'Test Message'
    }).then((rendered) => {
      if (rendered !== '<div>Test Message</div>') {
        callback('failed');
      } else {
        callback();
      }
    });

  });

});
