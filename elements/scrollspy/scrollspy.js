(function () {

	class HTMLCustomElement extends HTMLElement {
		constructor(_) { return (_ = super(_)).init(), _; }
		init() { /* override as you like */ }
	}

	class ScrollspyElement extends HTMLElement {
		/* On creation - ES5 compatible */
		init() { }

		/* Attributes to monitor */
		static get observedAttributes() { return ['attribute']; }

		/* Called when the element is inserted into a document */
		connectedCallback() {
		}

		/* Called when the element is removed from a document */
		disconnectedCallback() {
		}

		/* Called when the element is adopted to another document */
		/* adoptedCallback(oldDocument, newDocument) {} */

		/* Respond to attribute changes */
		attributeChangedCallback(attr, oldValue, newValue) {
		}

	}

{{REGISTERELEMENT}} /* This will be replaced by the build script */
})();
