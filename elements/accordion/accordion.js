(function () {
	var upTo = function (el, tagName) {
		tagName = tagName.toLowerCase();

		while (el && el.parentNode) {
			el = el.parentNode;
			if (el.tagName && el.tagName.toLowerCase() == tagName) {
				return el;
			}
		}
		return null;
	};

	class AccordionElement extends HTMLElement {
		constructor() {
			super();
		}
		/* Attributes to monitor */
		static get observedAttributes() { return ['type', 'button']; }

		/* Called when the element is inserted into a document */
		connectedCallback() {
			// Return early if no content is given
			if (!this.innerHTML) {
				return;
			}

			this.setAttribute('role', 'tablist');
			this.setAttribute('aria-multiselectable', 'true');

			var cards = this.querySelectorAll('.card')
			// Checkboxes
			if (cards.length) {
				for (var i = 0, l = cards.length; i < l; i++) {
					var toggler = cards[i].querySelector('[data-toggle="collapse"]');
					var togglerHref = toggler.getAttribute('href');
					if (!togglerHref) continue;
					var collapsed = document.getElementById(togglerHref.replace('#', ''));

					if (collapsed.classList.contains('show')) {
						collapsed.setAttribute('role', 'tabpanel');
						toggler.setAttribute('aria-expanded', 'true');
					} else {
						collapsed.setAttribute('role', 'tabpanel');
						toggler.setAttribute('aria-expanded', 'true');
					}

					toggler.addEventListener('click', function (event) {
						// find the parent
						event.preventDefault();
						event.stopPropagation();
						var container = upTo(event.target, 'bs4-accordion');
						container.resetAll();
						event.target.setAttribute('aria-expanded', 'true');
						var togglerHref = event.target.getAttribute('href')
						document.getElementById(togglerHref.replace('#', '')).classList.add('show');
					})
				}
			}
		}

		/* Called when the element is removed from a document */
		disconnectedCallback() {
		}

		/* Called when the element is adopted to another document */
		/* adoptedCallback(oldDocument, newDocument) {} */

		/* Respond to attribute changes */
		attributeChangedCallback(attr, oldValue, newValue) {
		}

		/* Custom methods */
		toggle() {

		}

		resetAll() {
			var cards = this.querySelectorAll('.card')
			for (var i = 0, l = cards.length; i < l; i++) {
				var toggler = cards[i].querySelector('[data-toggle="collapse"]');
				var togglerHref = toggler.getAttribute('href');
				if (!togglerHref) continue;
				var collapsed = document.getElementById(togglerHref.replace('#', ''));
				toggler.setAttribute('aria-expanded', 'true');
				collapsed.classList.remove('show');
			}
		}
	}

{{REGISTERELEMENT}} /* This will be replaced by the build script */
})();
