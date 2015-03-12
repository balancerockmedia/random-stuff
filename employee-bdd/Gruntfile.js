module.exports = function(grunt) {
    'use strict';

    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      
      concat: {
        options: {
          separator: ';'
        },
        
        app: {
          src: ['src/*.js'],
          dest: 'dist/<%= pkg.name %>-app.js'
        },
        
        vendor: {
          src: ['src/vendor/*.js'],
          dest: 'dist/<%= pkg.name %>-vendor.js'
        }
      },
      
      uglify: {
        options: {
          banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
        },
        dist: {
          files: {
            'dist/<%= pkg.name %>-app.min.js': ['<%= concat.app.dest %>']
          }
        }
      },
      
      jshint: {
        all: ['Gruntfile.js', 'src/*.js'],
      },
      
      cucumberjs: {
        src: 'tests/features',
        options: {
          steps: "tests/features/step_definitions",
          format: 'pretty'
        }
      },
      
      shell: {
        'cucumberjs': {
          command: 'cucumber.js tests -f pretty',
            options: {
              stdout: true,
              stderr: true
            }
         },
         'mocha': {
           command: 'mocha --reporter spec',
             options: {
               stdout: true,
               stderr: true
             }
          }
      },
        
      watch: {
        files: ['<%= jshint.files %>'],
        tasks: ['jshint']
      }
    });
    
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-shell');

    grunt.registerTask('bdd', ['jshint', 'shell:cucumberjs']);
    grunt.registerTask('tdd', ['jshint', 'shell:mocha']);
    
    grunt.registerTask('default', ['jshint', 'concat', 'uglify']);
};