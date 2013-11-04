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
};