module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-concat');
  
  grunt.initConfig({
    package:{
      name: 'POC'
    },
    shell: {
      options : {
        stdout: true
      }
    },
    concat: {
      styles: {
        dest: './public/assets/app.css',
        src: [
          'bower_components/bootstrap/dist/css/*.min.css',
          'public/css/*.css'
        ]
      },
      scripts: {
        options: {
          separator: ';'
        },
        dest: './public/assets/app.js',
        src: [
          'bower_components/jquery/dist/jquery.min.js',
          'bower_components/angular/angular.min.js',
          'bower_components/angular-route/angular-route.min.js',
          'bower_components/bootstrap/dist/js/bootstrap.min.js',
                  
          'public/js/filters/*.js',
          'public/js/filters/**/*.js',
          'public/js/services/services.js',
          'public/js/services/*Services.js',
          'public/js/services/**/*.js',
          'public/js/directives/directives.js',
          'public/js/controllers/controllers.js',
          'public/js/controllers/**/*.js',
          'public/js/controllers/*Ctrl.js',
          'public/js/config/routes.js',
          'public/js/app.js'
        ]
      }
    }
  });

  grunt.registerTask('default', ['concat']);
  
  };