# hexo-renderer-react2

> Test with Hexo@^5.4.1 / React@^17.0.2 / Babel@^7.12.7

Render ES6 React components as hexo templates

## Install

``` bash
$ npm install hexo-renderer-react2 react react-dom --save
```

This requires you to have `react` installed as well.


## Usage

* Name your components with the `.jsx` extension
* `export default` or `module.exports =` your component class
* ES6/7 syntax and JSX is handled by [`babel`][babel] Version 7
  * `.babelrc` Config file [preset requirements][babel-7-setup]:
    * @babel/preset-env
    * @babel/preset-react
  * demo
    ```json
    {
      "presets": [
        "@babel/preset-env",
        "@babel/preset-react"
      ],
      "plugins": [
        ["@babel/plugin-proposal-decorators", { "legacy": true }],
        ["@babel/plugin-proposal-class-properties", {"loose": true}],
        "@babel/plugin-proposal-function-sent",
        "@babel/plugin-proposal-export-namespace-from",
        "@babel/plugin-proposal-numeric-separator",
        "@babel/plugin-proposal-throw-expressions",
        ["@babel/plugin-proposal-private-methods", { "loose": true }],
        ["@babel/plugin-proposal-private-property-in-object", { "loose": true }]
      ]
    }
    ```

### Examples

*layout.jsx*
```js
import React from 'react';

export default class extends React.Component {
  render() {
    return (
      <html>
        <head>
          <title>{this.props.page.title}</title>
        </head>
        <body>
          <main dangerouslySetInnerHTML={{__html: this.props.page.body}} />
        </body>
      </html>
    );
  }
}
```

*post.jsx*
```js
import React from 'react';

export default class extends React.Component {
  render() {
    return (
      <div>
        <h3>POST: {this.props.page.title}</h3>
        <div>{this.props.page.date.toString()}</div>
      </div>
    )
  }
}
```


## License

This software is free to use under the MIT license.