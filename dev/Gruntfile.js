module.exports = function (grunt) {
  // Define some variables for watch files
  grunt.jsFiles = [
    '../js/app.js',
    '../js/fn.js',
    '../js/item.js',
    '../js/player.js',
    '../js/weapon.js',
    '../js/room.js',
    '../js/program.js'
    ];
  // Load NPM plugins
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-asciify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      dist:{
        src: grunt.jsFiles,
        dest: '../js/taapp-grunt.js'
      }
    },
    less: {
      compile: {
        files: {
          "../css/style.css" : "../css/style.less"
        }
      }
    },
    asciify: {
      myBanner: {
        text: 'sense'
      }
    },
    uglify:{
      options: {
        banner: '/*!\n <%= asciify_myBanner %> \n*/\n'
      },
      all:{
        src:'../js/taapp-grunt.js',
        dest:'../js/taapp-grunt.min.js'
      }
    },
    watch: {
      styles: {
        files: ['../css/style.less'],
        tasks: ['css_task']
      },
      scripts: {
        files: grunt.jsFiles,
        tasks: ['js_task']
      }
    }
  });
  // Registered asks.
  grunt.registerTask('css_task', ['less']);
  grunt.registerTask('js_task', ['concat', 'asciify', 'uglify']);
  grunt.registerTask('default', ['less']);

};