module.exports = function (grunt) {
	if (grunt.file.exists('settings-custom.yaml')) {
		// We have a custom setup
		var settings = grunt.file.readYAML('settings-custom.yaml');
		console.log('Custom settings supplied')
	} else {
		// We will use the default options
		var settings = grunt.file.readYAML('settings.yaml');
	}

	// Load required modules
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-babel');
	grunt.loadNpmTasks('grunt-sass');

	// Cleanup process
	grunt.registerTask('clearFiles', 'Clean up', function () {
		settings.elements.forEach(function (element) {
			// Remove the non minified css
			if (grunt.file.exists("dist/css/" + element + ".css")) {
				grunt.file.delete("dist/css/" + element + ".css");
			}
			if (grunt.file.exists('elements/' + element + '/' + element + '_a.js')) {
				grunt.file.delete('elements/' + element + '/' + element + '_a.js');
			}
		});
	});

	// Create WebComponentsJs compatible elements
	grunt.registerTask('createHtml', 'Create Html version of the elements', function () {
		settings.elements.forEach(function (element) {
			console.info(grunt.file.exists('dist/js/' + element + '.min.js'))
			if (grunt.file.exists('dist/js/' + element + '.min.js')) {
				// Compose the element as .html
				var tmpOutput = '<element name="' + settings.prefix + '-' + element + '">';
					tmpJs = grunt.file.read('dist/js/' + element + '.min.js');
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
			var plain = `
if (!window.customElements) {
	window.addEventListener('WebComponentsReady',function(){
		customElements.define('bs4-` + element + `', {{ELEMENTCLASS}});
	});
} else {
	customElements.define('bs4-` + element + `', {{ELEMENTCLASS}});
}
`,
			tmpJs = '', tmpJsPlain = '';

			if (grunt.file.exists('elements/' + element + '/' + element + '.js')) {
				tmpJs = grunt.file.read('elements/' + element + '/' + element + '.js');

				// Repeat
				tmpJs = grunt.file.read('elements/' + element + '/' + element + '.js');
				plain = plain.replace(/{{ELEMENTCLASS}}/g, element.capitalizeFirstLetter() + 'Element');
				tmpJs = tmpJs.replace(/{{REGISTERELEMENT}}/g, plain);
				tmpJs = tmpJs.replace(/bs4-/g, settings.prefix + '-');
				grunt.file.write('elements/' + element + '/' + element + '_a.js', tmpJs);

				grunt.config.set('babel.options', {
						sourceMap: false,
						"plugins": [
							["transform-custom-element-classes", {
								"name": element
							}],
							"transform-es2015-classes"],
						"presets": [
							["es2015", {
								"loose": false,
								"modules": false
							}],
							"babili",
						]
				});

				// As Js
				grunt.config.set('babel.' + element + '.files', [{
					dest: 'dist/js/' + element + '.min.js',
					src: 'elements/' + element + '/' + element + '_a.js',
				}]);

				grunt.task.run('babel:' + element);
			}
		};

		console.log('Build the custom Elements')
		settings.elements.forEach(function (element) {
			// Create the css for each element
			compileCss(element);

			// Create elements as html files, compatible with document-register-element polyfill
			createElement(element);
		});

		// Create elements as html files, compatible with webcomponentjs polyfill
		// grunt.task.run('createHtml');

		// Do the clean up
		grunt.task.run('clearFiles');
	});
};
