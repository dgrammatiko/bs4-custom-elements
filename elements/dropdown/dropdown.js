(function () {
	// walk up the tree till tagName
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

	class DropdownElement extends HTMLElement {

		/* Attributes to monitor */
		// static get observedAttributes() { return ['type', 'toggle']; }

		/* Called when the element is inserted into a document */
		connectedCallback() {
			var button = this.querySelector('button.dropdown-toggle');
			var link = this.querySelector('a.dropdown-toggle');
			var innerLinks = this.querySelectorAll('.dropdown-menu > a');
			var triggerEl;

			if (!button && !link) return;

			if (button) {
				triggerEl = button;
			} else {
				triggerEl = link;
			}

			if (!triggerEl.id) return;
			//var children = [].slice.call( menu[getElementsByTagName]('*'));
			this.classList.add('dropdown');
			this.style.display = 'block';
			triggerEl.setAttribute('aria-haspopup', 'true');
			triggerEl.setAttribute('aria-expanded', 'false');

			triggerEl.addEventListener('click', function (event) {
				var container = upTo(event.target, 'bs4-dropdown');

				if (container && container.classList.contains('show')) {
					container.classList.remove('show');
					event.target.setAttribute('aria-expanded', 'false')
				} else {
					container.classList.add('show');
					event.target.setAttribute('aria-expanded', 'true')
				}
			});

			for (var i = 0, l = innerLinks.length; i < l; i++) {
				innerLinks[i].addEventListener('click', function (event) {
					var container = upTo(event.target, 'bs4-dropdown');
					container.close();
				})
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

		close() {
			var button = this.querySelector('.dropdown-toggle');
			this.classList.remove('show');
			button.setAttribute("aria-expanded", "false");
		}

	}

{{REGISTERELEMENT}} /* This will be replaced by the build script */
})();
