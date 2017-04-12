var gulp=require("gulp"),
    spritesmith=require('gulp.spritesmith');

gulp.task('default', function () {

    return gulp.src('assets/sprite/**/*.png')//需要合并的图片地址
        .pipe(spritesmith({
            imgName: 'images/sprite.png',//保存合并后图片的地址
            cssName: 'sprite.css',//保存合并后对于css样式的地址
            padding:5,//合并时两个图片的间距
            algorithm: 'binary-tree',
            cssTemplate: function (data) {
                var arr=[];
                data.sprites.forEach(function (sprite) {
                    arr.push(".icon-"+sprite.name+
                    "{\n" +
                    "  background-image: url('"+sprite.escaped_image+"');\n"+
                    "  background-position: "+sprite.px.offset_x+" "+sprite.px.offset_y+";\n"+
                    "  width:"+sprite.px.width+";\n"+
                    "  height:"+sprite.px.height+";\n"+
                    "}\n");
                });
                return arr.join("");
            }

        }))
        .pipe(gulp.dest('assets/'));
});
