(function () {

	class ButtonElement extends HTMLElement {
		constructor() {
			super();
		}
		/* Attributes to monitor */
		static get observedAttributes() { return ['type', 'toggled']; }

		/* Called when the element is inserted into a document */
		connectedCallback() {

			// Single button
			if (this.type === 'button') {
				this.removeAttribute('aria-pressed');
				this.classList.remove('active');
				if (this.toggled && this.toggled === 'true') {
					this.classList.add('active');
					this.setAttribute('aria-pressed', 'true');
				}
				// No functionality for disabled button
				if (this.getAttribute('disabled')) return;

				this.addEventListener('click', function (event) {
					// No functionality for disabled button
					if (event.target.hasAttribute('disabled')) {
						event.preventDefault();
						event.stopPropagation();
					} else {
						event.target.toggle();
					}
				})
			} else if (this.type === 'buttons') {
				if (!this.classList.contains('btn', 'btn-group')) {
					this.classList.add('btn', 'btn-group')
				}

				var buttons = this.querySelectorAll('[type="checkbox"]')
				// Checkboxes
				if (buttons.length) {
					for (var i = 0, l = buttons.length; i < l; i++) {
						if (buttons[i].parentNode.tagName.toLowerCase() !== 'label') {
							continue;
						}
						if (buttons[i].getAttribute('checked') || buttons[i].parentNode.classList.contains('active')) {
							buttons[i].checked = true;
							buttons[i].setAttribute('checked', '');
							buttons[i].parentNode.setAttribute('aria-pressed', 'true');
						} else {
							buttons[i].checked = false;
							buttons[i].removeAttribute('checked', '');
							buttons[i].parentNode.setAttribute('aria-pressed', 'false');
						}

						buttons[i].addEventListener('click', function (event) {

							if (event.target.parentNode.tagName.toLowerCase() === 'label') {

								if (event.target.checked) {
									event.target.checked = true;
									event.target.setAttribute('checked', '');
									event.target.parentNode.classList.add('active');
									event.target.parentNode.setAttribute('aria-pressed', 'true');
								} else {
									event.target.checked = false;
									event.target.removeAttribute('checked');
									event.target.parentNode.classList.remove('active');
									event.target.parentNode.setAttribute('aria-pressed', 'false');
								}
							}
						})
					}
				} else { // Radios
					var radios = this.querySelectorAll('[type="radio"]');

					if (radios) {
						for (var i = 0, l = radios.length; i < l; i++) {
							if (radios[i].parentNode.tagName.toLowerCase() !== 'label') {
								continue;
							}
							if (radios[i].getAttribute('checked') || radios[i].parentNode.classList.contains('active')) {

								radios[i].checked = true;
								radios[i].setAttribute('checked', '');
								radios[i].parentNode.setAttribute('aria-pressed', 'true');
							} else {
								radios[i].checked = false;
								radios[i].removeAttribute('checked', '');
								radios[i].parentNode.setAttribute('aria-pressed', 'false');
							}

							radios[i].addEventListener('click', function (event) {

								if (event.target.parentNode.tagName.toLowerCase() === 'label') {
									if (event.target.checked) {
										event.target.parentNode.parentNode.clearAllRadios();
										event.target.checked = true;
										event.target.setAttribute('checked', '');
										event.target.parentNode.classList.add('active');
										event.target.parentNode.setAttribute('aria-pressed', 'true');
									} else {
										event.target.parentNode.parentNode.clearAllRadios();
										event.target.checked = false;
										event.target.removeAttribute('checked');
										event.target.parentNode.classList.remove('active');
										event.target.parentNode.setAttribute('aria-pressed', 'false');
									}
								}
							})
						}
					}
				}
			}
		}

		/* Called when the element is removed from a document */
		disconnectedCallback() {
			if (this.type === 'button') {
				this.removeEventListener('click', this);
			}
		}

		/* Called when the element is adopted to another document */
		/* adoptedCallback(oldDocument, newDocument) {} */

		/* Respond to attribute changes */
		attributeChangedCallback(attr, oldValue, newValue) {
			if (attr === "type") {
				if (['button', 'buttons'].indexOf(newValue) > -1) {
					this.type = newValue;
				}
			}
			if (attr === "toggled") {
				if (['true', 'false'].indexOf(newValue) > -1) {
					this.toggled = newValue;
					this.toggle();
				}
			}
		}

		toggle() {
			this.classList.toggle('active');
			if (this.getAttribute('aria-pressed') && this.getAttribute('aria-pressed') === 'true') {
				this.removeAttribute('aria-pressed');
			} else {
				this.setAttribute('aria-pressed', 'true');
			}
			if (this.toggled === 'true') {
				this.toggled === 'false'
			} else {
				this.toggled === 'true'
			}
		}

		clearAllRadios() {
			var radios = this.querySelectorAll('[type="radio"]');
			for (var i = 0, l = radios.length; i < l; i++) {
				radios[i].checked = false;
				radios[i].removeAttribute('checked');
				if (radios[i].parentNode.tagName.toLowerCase() == 'label') {
					radios[i].parentNode.classList.remove('active');
					radios[i].parentNode.setAttribute('aria-pressed', 'false');
				}
			}
		}
	}

{{REGISTERELEMENT}} /* This will be replaced by the build script */
})();
