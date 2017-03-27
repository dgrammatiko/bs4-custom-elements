module.exports = function (grunt) {
	if (grunt.file.exists('settings-custom.yaml')) {
		var settings = grunt.file.readYAML('settings-custom.yaml');
		console.log('Custom settings supplied')
	} else {
		var settings = grunt.file.readYAML('settings.yaml');
	}

	// Load required modules
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-sass');

	grunt.registerTask('clearFiles', 'Clean up', function () {
		settings.elements.forEach(function (element) {
			// Remove the non minified css
			if (grunt.file.exists("dist/css/" + element + ".css")) {
				grunt.file.delete("dist/css/" + element + ".css");
			}
			if (grunt.file.exists('elements/' + element + '/' + element + '_a.js')) {
				grunt.file.delete('elements/' + element + '/' + element + '_a.js');
			}
			if (grunt.file.exists('elements/' + element + '/' + element + '_b.js')) {
				grunt.file.delete('elements/' + element + '/' + element + '_b.js');
			}
			if (grunt.file.exists('elements/' + element + '/' + element + '_a.min.js')) {
				grunt.file.delete('elements/' + element + '/' + element + '_a.min.js');
			}
			if (grunt.file.exists('elements/' + element + '/' + element + '_b.min.js')) {
				grunt.file.delete('elements/' + element + '/' + element + '_b.min.js');
			}
		});
	});

	grunt.registerTask('createHtml', 'Create Html version of the elements', function () {
		settings.elements.forEach(function (element) {
			if (grunt.file.exists('elements/' + element + '/' + element + '_a.min.js')) {
				// Compose the element as .html
				var tmpOutput = '<element name="' + settings.prefix + '-' + element + '">';
					tmpJs = grunt.file.read('elements/' + element + '/' + element + '_a.min.js');
					tmpOutput += '<script>' + tmpJs + '</script>';
					tmpOutput += '</element>';

				// Write the Custom element
				grunt.file.write('dist/html/' + settings.prefix + '-' + element + '.html', tmpOutput);
			}
		});
	});

	grunt.registerTask('default', function () {
		String.prototype.capitalizeFirstLetter = function () {
			return this.charAt(0).toUpperCase() + this.slice(1);
		}

		// Compile the css files
		var compileCss = function(element) {
			grunt.config.set('sass.' + element + '.files', [{
				src: 'elements/' + element + '/' + element + '.scss',
				dest: 'dist/css/' + element + '.css'
			}]);

			grunt.task.run('sass:' + element);

			grunt.config.set('cssmin.' + element + '.files', [{
				src: 'dist/css/' + element + '.css',
				dest: 'dist/css/' + element + '.min.css'
			}]);

			grunt.task.run('cssmin:' + element);
		};

		// Create the custom element
		var createElement = function(element) {
var webComponents = `
	window.addEventListener('WebComponentsReady', function () {
		customElements.define('bs4-` + element + `', {{ELEMENTCLASS}});
	});
	`;
var plain = `
	customElements.define('bs4-` + element + `', {{ELEMENTCLASS}});
	`;
			var tmpJs = '', tmpJsPlain = '';
			if (grunt.file.exists('elements/' + element + '/' + element + '.js')) {
				tmpJs = grunt.file.read('elements/' + element + '/' + element + '.js');

				webComponents = webComponents.replace(/{{ELEMENTCLASS}}/g, element.capitalizeFirstLetter() + 'Element');
				tmpJs = tmpJs.replace(/{{REGISTERELEMENT}}/g, webComponents);
				tmpJs = tmpJs.replace(/bs4-/g, settings.prefix + '-');
				grunt.file.write('elements/' + element + '/' + element + '_a.js', tmpJs);

				// Repeat
				tmpJs = grunt.file.read('elements/' + element + '/' + element + '.js');
				plain = plain.replace(/{{ELEMENTCLASS}}/g, element.capitalizeFirstLetter() + 'Element');
				tmpJs = tmpJs.replace(/{{REGISTERELEMENT}}/g, plain);
				tmpJs = tmpJs.replace(/bs4-/g, settings.prefix + '-');
				grunt.file.write('elements/' + element + '/' + element + '_b.js', tmpJs);

				// As Js
				grunt.config.set('browserify.' + element + '.files', [{
					src: 'elements/' + element + '/' + element + '_b.js',
					dest: 'dist/js/' + element + '.min.js'
				}]);
				grunt.config.set('browserify.' + element + '.options', {
					transform: [["babelify", { "presets": ["babili"] }]]
				});

				grunt.task.run('browserify:' + element);

				// As Html
				grunt.config.set('browserify.' + element + '_a.files', [{
					src: 'elements/' + element + '/' + element + '_a.js',
					dest: 'elements/' + element + '/' + element + '_a.min.js'
				}]);
				grunt.config.set('browserify.' + element + '_a.options', {
					transform: [["babelify", { "presets": ["babili"] }]]
				});

				grunt.task.run('browserify:' + element + '_a');
			}
		};

		console.log('Build the custom Elements')
		settings.elements.forEach(function (element) {
			compileCss(element);
			createElement(element);
		});

		// Do the clean up
		grunt.task.run('createHtml');

		// Do the clean up
		grunt.task.run('clearFiles');
	});
};
