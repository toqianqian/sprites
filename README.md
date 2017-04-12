# gulp-sprite
合成雪碧图：项目中经常会遇到需要将多张图合成一张雪碧图，如果人工合成，成本太高，也不好维护。这里我们通过gulp.spritesmith来完成合成需要的雪碧图。

## package.json
```
...
"devDependencies": {
  "gulp": "^3.9.1",
  "gulp.spritesmith": "^6.2.1"
}
...
```

1. 执行 npm install 下载依赖的gulp与gulp.spritesmith
2. 等下载完成，执行 npm start 或者 gulp

这样就完成了雪碧图的合并，具体执行请参考package.json与gulpfile.js文件。

还有个比较好用的包sprity（在npm里面查看），它提供retina图

```
import {join} from 'path';
import {ASSETS_SRC} from '../config';

var gulpif = require('gulp-if');
var sprity = require('sprity');

export = function buildSprite(gulp, plugins) {
  return function () {
    return sprity.src({
        src: join(ASSETS_SRC, 'sprites', '**', '*.png'),
        template: 'tools/scss.hbs',
        cssPath: `/src/assets/images`,
        style: join(ASSETS_SRC, '_sprite.scss'),
        orientation: 'binary-tree',
        retina: true,
        margin: 2,
        // for example if you want to generate scss instead of css
        processor: 'sass', // make sure you have installed sprity-sass
        split: true,
        dimension: [{
          ratio: 1, dpi: 72
        }, {
          ratio: 2, dpi: 190
        }]
      })
      .pipe(gulpif('*.png', gulp.dest(`${ASSETS_SRC}/images`), gulp.dest(ASSETS_SRC)));
  };
}
```
