module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		less: {
			compile: {
				options: {
					report: "gzip"
				},
				files: {
					"./public/styles/main.css": "./public/less/main.less"
				}
			}
		},

		watch: {
			styles: {
				files: "./public/less/*.less",
				tasks: ["less"],
				options: {
					livereload: true
				}
			}
		},

		open: {
			dev: {	
				path: "http://localhost:3000"
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-open');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['less', 'open:dev', 'watch']);
	grunt.registerTask('server', 'Start a custom web server', function () {
		require('./app.js').listen(3000);
		grunt.log.writeln('Web Server listening on port 3000');

		grunt.task.run(['less', 'open:dev', 'watch']);
	});
};