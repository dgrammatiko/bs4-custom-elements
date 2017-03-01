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
					'elements/alert/alert.css': 'elements/alert/alert.scss',
					'elements/alert/alert-full.css': 'elements/alert/alert-full.scss',
					'elements/button/button.css': 'elements/button/button.scss',
					'elements/collapse/collapse.css': 'elements/collapse/collapse.scss',
					'demo/assets/decoupled-bs4/bootstrap.css': 'demo/assets/decoupled-bs4/bootstrap.scss',
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
							'<%= folder.elements %>/accordion/*.js',
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
					dest: 'dist/css'
				}]
			},
			bsCss: {
				files: [{
					expand: true,
					matchBase: true,
					ext: '.min.css',
					cwd: 'demo/assets/decoupled-bs4',
					src: ['*.css'],
					dest: 'demo/assets',
				}]
			}
		},

		// htmlmin: {                                     // Task
		// 	dist: {                                      // Target
		// 		options: {                                 // Target options
		// 			removeComments: true,
		// 			collapseWhitespace: true
		// 		},
		// 		files: {
		// 			'elements/alert/alert.Chtml': 'elements/alert/alert.html',     // 'destination': 'source'
		// 			'elements/button/button.Chtml': 'elements/button/button.html',     // 'destination': 'source'
		// 			'elements/modal/modal.Chtml': 'elements/modal/modal.html',
		// 			'elements/tabs/tabs.Chtml': 'elements/tabs/tabs.html',
		// 		}
		// 	}
		// }
	});

	// Load required modules
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-sass');

	grunt.task.run(['uglify:allJs']);
	grunt.task.run(['sass:dist']);
	grunt.task.run(['cssmin:allCss']);
	grunt.task.run(['cssmin:bsCss']);
	// grunt.task.run(['htmlmin:dist']);

	grunt.registerTask('default', function () {
		console.log('Build the custom Elements')
		settings.elements.forEach(function (element) {
			var tmpJs = '', tmpHtml = '', tmpCss = '', tmpFullCss = '';
			if (grunt.file.exists('elements/' + element + '/' + element + '.min.js')) {
				tmpJs = grunt.file.read('elements/' + element + '/' + element + '.min.js');
			}
			// if (grunt.file.exists('elements/' + element + '/' + element + '.Chtml')) {
			// 	tmpHtml = grunt.file.read('elements/' + element + '/' + element + '.Chtml');
			// }
			if (grunt.file.exists('dist/css/' + element + '/' + element + '.min.css')) {
				tmpCss = grunt.file.read('dist/css/' + element + '/' + element + '.min.css');
			}
			if (grunt.file.exists('dist/css/' + element + '/' + element + '-full.min.css')) {
				tmpFullCss = grunt.file.read('dist/css/' + element + '/' + element + '-full.min.css');
			}
			var someArray = ['a', 'b'];
			for (var i = 0, someArray; i < someArray.length; i++) {
				// Compose the element
				tmpOutput = '<element name="' + settings.prefix + '-' + element + '">';
				// Use the some css...
				if (tmpHtml || tmpCss) {
					tmpOutput += '<template id="' + settings.prefix + '-' + element + '">';
					// if (tmpHtml) {
					// 	tmpHtml = tmpHtml.replace(/dgt41-/g, settings.prefix + '-');
					// 	tmpOutput += tmpHtml;
					// }
					if (someArray[i] === 'a') {
						if (tmpCss) {
							tmpCss = tmpCss.replace(/dgt41-/g, settings.prefix + '-');
							tmpOutput += '<style>' + tmpCss + '</style>';
						}
					} else {
						if (tmpFullCss) {
							tmpFullCss = tmpFullCss.replace(/dgt41-/g, settings.prefix + '-');
							tmpOutput += '<style>' + tmpFullCss + '</style>';
							tmpOutput += '<slot></slot>';
						}
					}
					tmpOutput += '</template>';
				}
				if (tmpJs) {
					tmpJs = tmpJs.replace(/dgt41-/g, settings.prefix + '-');
					tmpOutput += '<script>' + tmpJs + '</script>';
				}
				tmpOutput += '</element>';


				if (someArray[i] === 'a') {
					// Write the Custom element
					console.log('Creating custom element: ' + element);
					grunt.file.write('dist/html/' + settings.prefix + '-' + element + '.html', tmpOutput); 
					grunt.file.write('demo/html/' + settings.prefix + '-' + element + '.html', tmpOutput);
				} else if (tmpFullCss) {
					// Write the Custom element
					console.log('Creating custom element: decoupled ' + element);
					grunt.file.write('dist/html/decoupled/' + settings.prefix + '-' + element + '.html', tmpOutput);
					grunt.file.write('demo/html/decoupled/' + settings.prefix + '-' + element + '.html', tmpOutput);
				}
			}

			if (grunt.file.exists('dist/css/' + element + '/' + element + '-full.min.css')) {
				grunt.file.delete('dist/css/' + element + '/' + element + '-full.min.css');
				grunt.file.delete('elements/' + element + '/' + element + '-full.css');
			}
			if (grunt.file.exists('dist/css/' + element + '/' + element + '.min.css')) {
				grunt.file.delete('dist/css/' + element + '/' + element + '.min.css');
				grunt.file.delete('elements/' + element + '/' + element + '.css');
			}
			if (grunt.file.exists('elements/' + element + '/' + element + '.css')) {
				grunt.file.delete('elements/' + element + '/' + element + '.css');
			}
			if (grunt.file.exists('elements/' + element + '/' + element + '.Chtml')) {
				grunt.file.delete('elements/' + element + '/' + element + '.Chtml');
			}
			if (grunt.file.exists('elements/' + element + '/' + element + '.min.js')) {
				grunt.file.delete('elements/' + element + '/' + element + '.min.js');
			}
		});

		if (grunt.file.exists('dist/css/decoupled-bs4/bootstrap.min.css')) {
			var bs = grunt.file.read('dist/css/decoupled-bs4/bootstrap.min.css');
			grunt.file.write('dist/html/decoupled/bootstrap/bootstrap-core.min.css', bs);
			grunt.file.delete('dist/css/decoupled-bs4/bootstrap.min.css');
			grunt.file.delete('elements/decoupled-bs4/bootstrap.css');
		}

		if (grunt.file.exists('dist/css'))
			grunt.file.delete('dist/css');
	});
};
