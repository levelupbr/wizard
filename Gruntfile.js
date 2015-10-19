module.exports = function(grunt)
{
	grunt.initConfig(
	{
		less: {
			dev: {
				options: {
					paths: ['dev/less'],
					dumpLineNumbers: 'comments'
				},
				files: {
					'dev/css/wizard.css': [
						'dev/less/libs/**/*.less',
						'dev/less/app/**/*.less'
					]
				}
			},
			dist: {
				options: {
					paths: ['dev/less'],
					yuicompress: true,
					compress: true
				},
				files: {
					'dist/css/wizard.min.css': [
						'dev/less/commons/reset.less',
						'dev/less/app/**/*.less'
					]
				}
			},
		},
		watch: {
			less: {
				files: 'dev/less/**/*.less',
				tasks: 'less:dev'
			}
		},
		clean: {
			dist: { src: 'dist/' }
		},
		usemin: {
			dist: 'dev/**/*.html'
		},
		copy: {
			dist: {
				files: [{
					expand: true,
					cwd: 'dev/',
					src: [
						'**',
						'!less/**',
						'!css/**'
					],
					dest: 'dist/'
				}]
			}
		},
		// concat: {
		// 	options: {
		// 		stripBanners: { all: true }
		// 	},
		// 	dist: {
		// 		src: [
		// 			'dev/js/libs/cripto/**/*.js',
		// 			'dev/js/libs/angular/angular.min.js',
		// 			'dev/js/libs/angular/modules/**/*.js',
		// 			'temp/app.js'
		// 		],
		// 		dest: 'dist/js/main.js',
		// 	}
		// }
	});

	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-usemin');
	grunt.loadNpmTasks('grunt-contrib-copy');
	// grunt.loadNpmTasks('grunt-contrib-concat');

	grunt.registerTask('default', ['watch']);
	grunt.registerTask('dev',     ['less:dev']);
	grunt.registerTask('dist',    ['clean', 'usemin', 'copy', 'less:dist']);
};
