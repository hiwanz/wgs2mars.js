module.exports = function(grunt) {
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! \nAuthor: <%= pkg.author %>\nSource: <%= pkg.repository.url %>\nDate: <%= grunt.template.today("yyyy-mm-dd HH:MM:ss") %> \n*/\n',
        footer:'\n',
        beautify: {
          ascii_only: true
        },
        compress: {
          global_defs: {
            'DEBUG': false
          },
          dead_code: true
        },
        compress: {
          drop_console: true
        }
      },
      dist: {
        files: {
        'src/js/wgs2mars.min.js': ['src/js/wgs2mars.js']
      }
      }
    },
    jshint: {
      files: ['src/js/wgs2mars.js'],
      options: {
        "jshintrc": ".jshintrc"
      }
    },
    watch: {
      scripts: {
        files: ['src/js/*.js', '!src/js/*.min.js'],
        tasks: ['build']
      }
    },
    clean:{
      spm : {
        src: [ '**/.gitignore','**/.npmignore']
      }
    }
  });

  grunt.registerTask('build', ['uglify']);

  grunt.registerTask('default', ['build', 'watch']);
};