(function () {

	class AlertElement extends HTMLElement {
		constructor() {
			super();
		}
		/* Attributes to monitor */
		static get observedAttributes() { return ['type', 'button']; }
		get type() { return this.getAttribute('type'); }
		get button() { return this.getAttribute('button'); }

		/* Called when the element is inserted into a document */
		connectedCallback() {

			this.container = document.createElement('div');
			this.container.setAttribute('role', 'alert');
			this.container.classList.add("alert");
			this.container.classList.add("fade");
			this.container.classList.add("show");
			this.container.innerHTML = this.innerHTML;
			this.innerHTML = '';

			switch (this.type) {
				case 'success': this.container.classList.add("alert-success"); break;
				case 'warning': this.container.classList.add("alert-warning"); break;
				case 'danger': this.container.classList.add("alert-danger"); break;
				case 'info': this.container.classList.add("alert-info"); break;
				default: this.container.classList.add("alert-info");
			}

			this.appendChild(this.container);

			if (this.button && this.button === "true") {
				this.appendCloseButton();
			}
		}

		/* Called when the element is removed from a document */
		disconnectedCallback() {
			this.removeEventListener('close.bs.alert', this);
			this.removeEventListener('closed.bs.alert', this);
			var container = this.querySelector('div');
			if (container.firstChild) container.firstChild.removeEventListener('click', this);
		}

		/* Called when the element is adopted to another document */
		/* adoptedCallback(oldDocument, newDocument) {} */

		/* Respond to attribute changes */
		attributeChangedCallback(attr, oldValue, newValue) {
			var container = this.querySelector('div');
			if (attr = "type" && container) {
				if (['info', 'warning', 'danger', 'success'].indexOf(newValue) > -1) {
					container.classList.remove('alert-' + oldValue);
					container.classList.add('alert-' + newValue);
				}
			}
			if (attr = 'button') {
				if (newValue === "false") this.removeCloseButton();
				if (newValue === "true") this.appendCloseButton();
			}
		}

		close() {
			this.dispatchCustomEvent('close.bs.alert');
			var container = this.querySelector('div');
			if ('WebkitTransition' in document.documentElement.style || 'transition' in document.documentElement.style) {
				container.addEventListener("transitionend", function (event) {
					event.target.parentNode.dispatchCustomEvent('closed.bs.alert');
					event.target.parentNode.removeChild(event.target);
				}, false);
			}

			container.classList.remove('show');

			if (!'WebkitTransition' in document.documentElement.style || !'transition' in document.documentElement.style) {
				this.dispatchCustomEvent('closed.bs.alert');
				this.parentNode.removeChild(this);
			}
		}

		dispatchCustomEvent(eventName) {
			var OriginalCustomEvent = new CustomEvent(eventName);
			OriginalCustomEvent.relatedTarget = this;
			this.dispatchEvent(OriginalCustomEvent);
			this.removeEventListener(eventName, this);
		}

		appendCloseButton() {
			var container = this.querySelector('div.alert');
			if (!this.querySelector('button[aria-label="Close"]') && container) {
				var closeButton = document.createElement('button');
				closeButton.setAttribute('type', 'button');
				closeButton.setAttribute('aria-label', 'Close');
				closeButton.classList.add('close');
				closeButton.innerHTML = '<span aria-hidden="true">&times;</span>';

				if (container.firstChild) {
					container.insertBefore(closeButton, container.firstChild);
				} else {
					container.appendChild(closeButton);
				}

				if (container.firstChild) {
					/* Add the required listener */
					container.firstChild.addEventListener('click', function (event) {
						var element = event.target;

						if (event.target.parentNode.tagName.toLowerCase() === 'button') {
							element = event.target.parentNode;
						}

						element.parentNode.parentNode.close();
					});
				}
			}
		}

		removeCloseButton() {
			var container = this.querySelector('div');
			if (container.firstChild) {
				container.firstChild.removeEventListener('click', this);
				container.removeChild(this.firstChild);
			}
		}
	}

{{REGISTERELEMENT}} /* This will be replaced by the build script */
})();
