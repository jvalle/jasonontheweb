module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		open: {
			dev: {	
				path: "http://localhost:3000"
			}
		},

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

		autoprefixer: {
			single_file: {
				src: './public/styles/main.css'
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
		}		
	});

	grunt.loadNpmTasks('grunt-open');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['open:dev', 'less', 'autoprefixer', 'watch']);

	grunt.registerTask('server', 'Start a custom web server', function () {
		require('./app.js').listen(3000);
		grunt.log.writeln('Web Server listening on port 3000');

		grunt.task.run(['open:dev', 'less', 'autoprefixer', 'watch']);
	});

	grunt.registerTask('prod', 'Initiate Prod Web Server', function () {
		require('./app.js').listen(3000);
		grunt.log.writeln('Web Server listening on port 3000');

		grunt.task.run(['autoprefixer', 'watch']);
	});
};