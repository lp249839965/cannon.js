var fs = require('fs')

module.exports = function(grunt) {

    var bundlePath = "build/cannon.js",
        minifiedBundlePath = "build/cannon.min.js";

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                separator: '\n\n'
            },

            demo : {
                src: ['src/demo/Demo.js'],
                dest: 'build/cannon.demo.js'
            },
        },

        browserify : {
            cannon : {
                src : ["src/Cannon.js"],
                dest : bundlePath,
                options : {
                    standalone : "CANNON"
                }
            }
        },

        uglify : {
            build : {
                src : [bundlePath],
                dest : minifiedBundlePath
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.registerTask('default', ['concat', 'browserify', 'uglify', 'addLicense']);

    grunt.registerTask('addLicense','Adds the LICENSE to the top of the built files',function(){
        var text = fs.readFileSync("LICENSE").toString();

        var dev = fs.readFileSync(bundlePath).toString();
        var min = fs.readFileSync(minifiedBundlePath).toString();

        fs.writeFileSync(bundlePath,text+"\n"+dev);
        fs.writeFileSync(minifiedBundlePath,text+"\n"+min);
    });
};
