/* global hexo */
'use strict'

const renderer = require('./lib/compile')

hexo.extend.renderer.register('jsx', 'html', renderer)
