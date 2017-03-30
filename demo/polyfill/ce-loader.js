(function() {
  'use strict';
  var name = 'ce-loader.js';

  if (!window.customElements) {
		var script = document.querySelector('script[src*="' + name + '"]');
		var newScript = document.createElement('script');
		// Load it from the right place.
		var replacement = 'document-register-element.js';
		var url = script.src.replace(name, replacement);
		newScript.src = url;
		document.head.appendChild(newScript);
	} else {
		// Ensure `WebComponentsReady` is fired also when there are no polyfills loaded.
		requestAnimationFrame(function () {
			window.dispatchEvent(new CustomEvent('WebComponentsReady'));
		});
	}
})();
