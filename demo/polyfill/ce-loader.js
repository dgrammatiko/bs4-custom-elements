(function (window) {
	'use strict';

	var name = 'ce-loader.js',
		script = document.querySelector('script[src*="' + name + '"]'),
		loadScript = function (scriptPath) {
			var newScr = document.createElement('script');
			newScr.src = script.src.replace(name, scriptPath);
			document.head.appendChild(newScr);
		};

	// Check if ES6 is ok
	if (typeof Reflect === undefined || typeof Proxy === undefined || typeof Proxy !== "function") {
		loadScript('es6-shim.min.js');
	}

	// Check if custom elements are natively supported
	if (!window.customElements) {
		loadScript('document-register-element.js');
	}
})(window);

/**
 *
 * This code introduces an event similar to WebComponentsJs from Google
 * A patch in document-register-element.js is required:
 *
 * The last part `})(window);` needs to be replaced with:
 * `var evt=document.createEvent("HTMLEvents");evt.initEvent("WebComponentsReady", true, true);window.dispatchEvent(evt);})(window);`
 *
 * This is important due to async nature, and the ordering of the scripts!!!!
 */

// IE
(function (window) {
	function CustomEvent(event, params) {
		params = params || { bubbles: false, cancelable: false, detail: undefined };
		var evt = document.createEvent('CustomEvent');
		evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
		return evt;
	};
	CustomEvent.prototype = window.CustomEvent.prototype;
	window.CustomEvent = CustomEvent;
})(window);
