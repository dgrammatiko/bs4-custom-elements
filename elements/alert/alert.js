(function () {

	class HTMLCustomElement extends HTMLElement {
		constructor(_) { return (_ = super(_)).init(), _; }
		init() { /* override as you like */ }
	}

	class AlertElement extends HTMLElement {
		/* On creation - ES5 compatible */
		init() {}

		/* Attributes to monitor */
		static get observedAttributes() { return ['type', 'button']; }

		/* Called when the element is inserted into a document */
		connectedCallback() {

			/* Return early if no content is given */
			if (!this.innerHTML) {
				return;
			}
			this.type = this.getAttribute('type');
			this.button = this.getAttribute('button')
			this.setAttribute('role', 'alert');
			this.classList.add("alert");
			this.classList.add("fade");
			this.classList.add("show");
			this.style.display = 'block';

			if (this.type && ['info', 'success', 'warning', 'danger'].indexOf(this.type) > -1) {
				if (this.type === 'success') {
					this.classList.add('alert-success');
				}
				if (this.type === 'danger') {
					this.classList.add('alert-danger');
				}
				if (this.type === 'info') {
					this.classList.add('alert-info');
				}
				if (this.type === 'warning') {
					this.classList.add('alert-warning');
				}
			} else {
				this.classList.add('alert-info');
			}

			if (this.button && this.button === "true") {
				this.appendCloseButton();
			}
		}

		/* Called when the element is removed from a document */
		disconnectedCallback() {
			this.removeEventListener('close.bs.alert', this);
			this.removeEventListener('closed.bs.alert', this);
			if (this.firstChild)
				this.firstChild.removeEventListener('click', this);
		}

		/* Called when the element is adopted to another document */
		/* adoptedCallback(oldDocument, newDocument) {} */

		/* Respond to attribute changes */
		attributeChangedCallback(attr, oldValue, newValue) {
			if (attr = "type") {
				if (this.classList.contains('alert-' + oldValue) && ['info', 'warning', 'danger', 'success'].indexOf(newValue) > -1) {
					this.classList.remove('alert-' + oldValue);
					this.classList.add('alert-' + newValue);
				}
			}
			if (attr = 'button') {
				if (oldValue === "true" && newValue === "false")
					this.removeCloseButton();
				if (oldValue === "false" && newValue === "true")
					this.appendCloseButton();
			}
		}


		close() {
			this.dispatchCustomEvent('close.bs.alert');

			if ('WebkitTransition' in document.documentElement.style || 'transition' in document.documentElement.style) {
				this.addEventListener("transitionend", function (event) {
					event.target.dispatchCustomEvent('closed.bs.alert');
					event.target.parentNode.removeChild(event.target);
				}, false);
			}

			this.classList.remove('show');

			if (!'WebkitTransition' in document.documentElement.style || !'transition' in document.documentElement.style) {
				this.dispatchCustomEvent('closed.bs.alert');
				this.parentNode.removeChild(this);
			}
		};

		dispatchCustomEvent(eventName) {
			var OriginalCustomEvent = new CustomEvent(eventName);
			OriginalCustomEvent.relatedTarget = this;
			this.dispatchEvent(OriginalCustomEvent);
			this.removeEventListener(eventName, this);
		};

		appendCloseButton() {
			if (!this.querySelector('button[aria-label="Close"]')) {
				var closeButton = document.createElement('button');
				closeButton.setAttribute('type', 'button');
				closeButton.setAttribute('aria-label', 'Close');
				closeButton.classList.add('close');
				closeButton.innerHTML = '<span aria-hidden="true">&times;</span>';

				if (this.firstChild) {
					this.insertBefore(closeButton, this.firstChild);
				} else {
					this.appendChild(closeButton);
				}

				if (this.firstChild) {
					/* Add the required listener */
					this.firstChild.addEventListener('click', function (event) {
						var element = event.target;

						if (event.target.parentNode.tagName.toLowerCase() === 'button') {
							element = event.target.parentNode;
						}

						element.parentNode.close();
					});
				}
			}
		};

		removeCloseButton() {
			if (this.firstChild) {
				this.firstChild.removeEventListener('click', this);
				this.removeChild(this.firstChild);
			}
		};
	}

{{REGISTERELEMENT}} /* This will be replaced by the build script */
})();
