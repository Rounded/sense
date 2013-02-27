/*global module:false*/

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
  //grunt.css_compiles = '../css/bootstrapwp.css';
  // Load NPM plugins
  //grunt.loadNpmTasks('grunt-grunticon');
  grunt.loadNpmTasks('grunt-contrib-less');
  // Project configuration.
  grunt.initConfig({
    concat: {
      dist:{
        src: grunt.jsFiles,
        dest: '../js/taapp-grunt.js'
      }
    },
    min: {
      dist: {
        src: ['../js/taapp-grunt.js'],
        dest: '../js/taapp-grunt.min.js'
      }
    },
    less: {
      compile:{
        files: {
          "../css/style.css": "../css/style.less"
        }
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
      },
      grunt: {
        files: ['grunt.js'],
        tasks: ['grunt']
      }
    }

  });

  // Registered asks.
  grunt.registerTask('css_task', 'less');
  grunt.registerTask('js_task', 'concat min');
  grunt.registerTask('default', 'less');
  grunt.registerTask('grunt', 'watch');

};