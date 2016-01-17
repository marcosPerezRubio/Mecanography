module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);
    grunt.initConfig({
        'create-windows-installer': {
            x64: {
                appDirectory: '.',
                outputDirectory: '.',
                authors: 'Mecanography.',
                exe: 'mecanography.exe'
            }
        },
        shell: {
            run: {
                command: 'electron .'
            }
        }
    });

grunt.loadNpmTasks('grunt-electron-installer');
grunt.loadNpmTasks('grunt-shell');

grunt.registerTask('executable', ['create-windows-installer']);
grunt.registerTask('run', ['shell:run']);
};