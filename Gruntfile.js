module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);
    grunt.initConfig({
        paths: {
            srcJs: 'assets/js',
            destJs: 'assets/public/js',
            srcImg: 'assets/images',
            destImg: 'assets/public/images'
        },
        'copy':{
            main: {
                files: [{
                    expand: true,
                    cwd: '<%= paths.srcJs %>',
                    src: ['**'],
                    dest: '<%= paths.destJs %>'
                }]
            },
            img: {
                files: [{
                    expand: true,
                    cwd: '<%= paths.srcImg %>',
                    src: ['**'],
                    dest: '<%= paths.destImg %>'
                }]
            },
            'styles' : {
                files: [{
                    expand: true,
                    cwd: 'assets/styles',
                    src: ['**'],
                    dest: 'assets/public/styles'
                }]
            }
        },
        'cssmin' : {
            dist: {
                src: ['assets/styles/site.css'],
                dest: 'assets/public/styles/site.min.css'
            }
        }
    });
    grunt.registerTask('default',['cssmin','copy'])
    grunt.registerTask('live',['cssmin'])
}