module.exports = function(grunt) {
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! \nAuthor: <%= pkg.author.name %>\nSource: <%= pkg.repository.url %>\nDate: <%= grunt.template.today("yyyy-mm-dd HH:MM:ss") %> \n*/\n',
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
        'lib/wgs2mars.min.js': ['lib/wgs2mars.js']
      }
      }
    },
    jshint: {
      files: ['lib/wgs2mars.js'],
      options: {
        "jshintrc": ".jshintrc"
      }
    },
    watch: {
      scripts: {
        files: ['lib/*.js', '!lib/*.min.js'],
        tasks: ['build']
      }
    },
    clean:{
      spm : {
        src: [ '**/.gitignore','**/.npmignore']
      }
    }
  });

  grunt.registerTask('build', ['jshint','uglify']);

  grunt.registerTask('default', ['build', 'watch']);
};