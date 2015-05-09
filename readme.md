[![Build Status](https://travis-ci.org/webcaetano/gulp-webpack-glob.svg?branch=master)](https://travis-ci.org/webcaetano/gulp-webpack-glob) [![npm version](https://badge.fury.io/js/gulp-webpack-glob.svg)](http://badge.fury.io/js/gulp-webpack-glob)

# Gulp Webpack Glob

![glob](https://raw.githubusercontent.com/isaacs/node-glob/master/oh-my-glob.gif)

Able to webpack support glob wildcards

### Install
```
npm install gulp-webpack-glob
```

### Usage
```javascript
var webpackGlob = require('gulp-webpack-glob');

gulp.src('test/test1/index.js')
		.pipe(webpackGlob())

// before

'use strict';

import './lib/*.js';
import utils from './utils.js';


// after
import './lib/foo.js';
import './lib/bar.js';
import utils from './utils.js';

```

Or with Filename as var

```javascript
// before

'use strict';

import * './lib/*.js';
import utils from './utils.js';


// after
import foo './lib/foo.js';
import bar './lib/bar.js';
import utils from './utils.js';
```

---------------------------------

The MIT [License](https://raw.githubusercontent.com/webcaetano/gulp-webpack-glob/master/LICENSE.md)
