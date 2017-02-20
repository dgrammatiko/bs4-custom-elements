module.exports = function (grunt) {
	if (grunt.file.exists('settings-custom.yaml')) {
		var settings = grunt.file.readYAML('settings-custom.yaml');
		console.log('Custom settings supplied')
	} else {
		var settings = grunt.file.readYAML('settings.yaml');
	}

	// Project configuration.
	grunt.initConfig({
		folder: {
			elements: 'elements',
			html: 'dist/html',
			css: 'dist/css',
		},

		// Compile Sass source files to CSS
		sass: {
			dist: {
				options: {
					precision: '5',
					sourceMap: false // SHOULD BE FALSE FOR DIST
				},
				files: {
					'elements/alert/alert.css': 'elements/alert/alert.scss'
				}
			}
		},

		// Minimize some javascript files
		uglify: {
			allJs: {
				files: [
					{
						src: [
							'<%= folder.elements %>/alert/*.js',
							'<%= folder.elements %>/button/*.js',
							'<%= folder.elements %>/carousel/*.js',
							'<%= folder.elements %>/collapse/*.js',
							'<%= folder.elements %>/dropdown/*.js',
							'<%= folder.elements %>/modal/*.js',
							'<%= folder.elements %>/popover/*.js',
							'<%= folder.elements %>/scrollspy/*.js',
							'<%= folder.elements %>/tabs/*.js',
							'<%= folder.elements %>/tooltip/*.js',
						],
						dest: '',
						expand: true,
						ext: '.min.js'
					}
				]
			}
		},

		// Let's minify some css files
		cssmin: {
			allCss: {
				files: [{
					expand: true,
					matchBase: true,
					ext: '.min.css',
					cwd: 'elements',
					src: ['*/*.css', '!*/*.min.css'],
					dest: 'dist/css',
				}]
			}
		},

		htmlmin: {                                     // Task
			dist: {                                      // Target
				options: {                                 // Target options
					removeComments: true,
					collapseWhitespace: true
				},
				files: {
					'elements/alert/alert.Chtml': 'elements/alert/alert.html',     // 'destination': 'source'
					'elements/modal/modal.Chtml': 'elements/modal/modal.html',
					'elements/tabs/tabs.Chtml': 'elements/tabs/tabs.html',
				}
			}
		}
	});

	// Load required modules
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-sass');

	grunt.task.run(['uglify:allJs']);
	grunt.task.run(['sass:dist']);
	grunt.task.run(['cssmin:allCss']);
	grunt.task.run(['htmlmin:dist']);

	grunt.registerTask('default', function () {
		console.log('Build the custom Elements')
		settings.elements.forEach(function (element) {
			var tmpJs, tmpHtml, tmpCss;
			if (grunt.file.exists('elements/' + element + '/' + element + '.min.js')) {
				tmpJs = grunt.file.read('elements/' + element + '/' + element + '.min.js');
			}
			if (grunt.file.exists('elements/' + element + '/' + element + '.Chtml')) {
				tmpHtml = grunt.file.read('elements/' + element + '/' + element + '.Chtml');
			}
			if (grunt.file.exists('dist/css/' + element + '/' + element + '.min.css')) {
				tmpCss = grunt.file.read('dist/css/' + element + '/' + element + '.min.css');
			}

			// Compose the element
			tmpOutput = '<element name="' + settings.prefix + '-' + element + '">';
			// Use the shadow dom...
			// if (tmpHtml || tmpCss) {
			// 	tmpOutput += '<template>';
			// 	if (tmpHtml) {
			// 		tmpHtml = tmpHtml.replace(/dgt41-/g, settings.prefix + '-');
			// 		tmpOutput += tmpHtml;
			// 	}
			// 	if (tmpCss) {
			// 		tmpHtml = tmpCss.replace(/dgt41-/g, settings.prefix + '-');
			// 		tmpOutput += '<style>' + tmpCss + '</style>';
			// 	}
			// 	tmpOutput += '</template>';
			// }
			if (tmpJs) {
				tmpJs = tmpJs.replace(/dgt41-/g, settings.prefix + '-');
				tmpOutput += '<script>' + tmpJs + '</script>';
			}
			tmpOutput += '</element>';

			// Write the Custom element
			console.log('Creating custom element: ' + element);
			grunt.file.write('dist/html/' + settings.prefix + '-' + element + '.html', tmpOutput);


			if (grunt.file.exists('elements/' + element + '/' + element + '.css')) {
				grunt.file.delete('elements/' + element + '/' + element + '.css');
			}
			if (grunt.file.exists('elements/' + element + '/' + element + '.Chtml')) {
				grunt.file.delete('elements/' + element + '/' + element + '.Chtml');
			}
			if (grunt.file.exists('elements/' + element + '/' + element + '.min.js')) {
				grunt.file.delete('elements/' + element + '/' + element + '.min.js');
			}

		})
	});
};
