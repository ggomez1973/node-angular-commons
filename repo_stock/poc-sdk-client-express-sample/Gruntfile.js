module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-concat');
  
  grunt.initConfig({
    package:{
      name: 'Prueba de concepto'
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
          'public/stylesheets/*.css'
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
                  
          'public/javascripts/filters/*.js',
          'public/javascripts/filters/**/*.js',
          'public/javascripts/services/services.js',
          'public/javascripts/services/*Services.js',
          'public/javascripts/services/**/*.js',
          'public/javascripts/directives/directives.js',
          'public/javascripts/controllers/controllers.js',
          'public/javascripts/controllers/**/*.js',
          'public/javascripts/controllers/*Ctrl.js',
          'public/javascripts/config/routes.js',
          'public/javascripts/app.js',
        ]
      }
    }
  });

  grunt.registerTask('default', ['concat']);
  
  };