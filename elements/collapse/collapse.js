(function () {

	class CollapseElement extends HTMLElement {

		/* Attributes to monitor */
		static get observedAttributes() { return ['state']; }

		/* Called when the element is inserted into a document */
		connectedCallback() {
			// id is required
			if (!this.id) return;

			var linked = document.querySelectorAll('[href="#' + this.id + '"],[data-target="#' + this.id + '"]');

			for (var i = 0, l = linked.length; i < l; i++) {
				if (!this.state || this.state === "closed") {
					linked[i].setAttribute('aria-expanded', 'false');
					linked[i].setAttribute('aria-controls', this.id);
					this.classList.remove('show')
				} else {
					linked[i].setAttribute('aria-expanded', 'true');
					linked[i].setAttribute('aria-controls', this.id);
					this.classList.add('show');
				}

				linked[i].addEventListener('click', function (event) {

					if (!event.target.hasAttribute('data-target')) var colId = event.target.getAttribute('href').replace('#', '');
					if (!event.target.hasAttribute('href')) var colId = event.target.getAttribute('data-target').replace('#', '');
					event.preventDefault();
					event.stopPropagation();
					document.getElementById(colId).toggle();
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
			if (attr = 'state') {
				var linked = document.querySelector('[href="#' + this.id + '"]');
				if (newVal === "closed") {
					linked.setAttribute('aria-expanded', 'false');
				} else if (newVal === "open") {
					linked.setAttribute('aria-expanded', 'true');
				}
			}
		}

		toggle() {
			var linked = document.querySelector('[href="#' + this.id + '"]');
			if (!linked) linked = document.querySelector('[data-target="#' + this.id + '"]');
			if (this.state === "closed") {
				linked.setAttribute('aria-expanded', 'true');
			} else {
				linked.setAttribute('aria-expanded', 'false');
			}
			this.classList.toggle('show');
		}

	}

{{REGISTERELEMENT}} /* This will be replaced by the build script */
})();
