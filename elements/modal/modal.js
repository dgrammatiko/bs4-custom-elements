(function () {

    /**
     * Get all of an element's parent elements up the DOM tree
     * @param  {Node}   elem     The element
     * @param  {String} selector A class, ID, data attribute or tag to filter against [optional]
     * @return {Array}           The parent elements
     */
	var getParents = function (elem, selector) {

		// Element.matches() polyfill
		if (!Element.prototype.matches) {
			Element.prototype.matches =
				Element.prototype.matchesSelector ||
				Element.prototype.mozMatchesSelector ||
				Element.prototype.msMatchesSelector ||
				Element.prototype.oMatchesSelector ||
				Element.prototype.webkitMatchesSelector ||
				function (s) {
					var matches = (this.document || this.ownerDocument).querySelectorAll(s),
						i = matches.length;
					while (--i >= 0 && matches.item(i) !== this) { }
					return i > -1;
				};
		}

		// Setup parents array
		var parents = [];

		// Get matching parent elements
		for (; elem && elem !== document; elem = elem.parentNode) {
			if (selector) {
				if (elem.matches(selector)) {
					parents.push(elem);
				}
			} else {
				parents.push(elem);
			}
		}
		return parents;
	};

	class HTMLCustomElement extends HTMLElement {
		constructor(_) { return (_ = super(_)).init(), _; }
		init() { /* override as you like */ }
	}

	class ModalElement extends HTMLElement {
		/* On creation - ES5 compatible */
		init() { }

		/* Attributes to monitor */
		// static get observedAttributes() { return ['type', 'toggle']; }

		/* Called when the element is inserted into a document */
		connectedCallback() {
			var modal = this.querySelector('.modal'),
			triggerBtn = document.querySelector("button[data-target=\"#" + modal.id + "\"]");
			if (triggerBtn) {
				triggerBtn.addEventListener('click', function (ev) {
					var dropShadow = document.createElement('div'),
						modalContent = modal.querySelector('.modal-content');
					dropShadow.classList.add('modal-backdrop', 'show');
					document.body.appendChild(dropShadow);
					modal.classList.toggle('show');
					modal.style.display = modal.style.display !== 'block' ? 'block' : 'none';
					modal.focus()
					// if ('WebkitTransition' in document.documentElement.style || 'transition' in document.documentElement.style) {
					//     dropShadow.addEventListener("transitionend", function(event) {
					//         console.log(modal)
					//         modal.classList.toggle('show');
					//         modal.style.display = 'block'; }, false);
					// } else {
					//     modal.classList.toggle('show');
					//     modal.style.display = 'block';
					// }

					modal.addEventListener('click', function (event) {
						var openModal = event.target,
							modalEl = getParents(openModal, 'bs4-modal')[0],
							isInScope = getParents(event.target, '.modal-content'),
							modalContent = modalEl.querySelector('.modal-content');

						if (isInScope.length === 0) {
							modalEl.close();
						}
					})
				})
			}

			// Is there a close button?
			var modalButton = modal.querySelectorAll('button[data-dismiss="modal"]');

			for (var i = 0, l = modalButton.length; i < l; i++) {
				// Add listeners for close
				modalButton[i].addEventListener('click', function (event) {
					var elm = getParents(event.target, 'bs4-modal');
					elm[0].close();
				});
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
			var dropShadow = document.querySelector('.modal-backdrop');
			var modal = this.querySelector('.modal');
			if (dropShadow) document.body.removeChild(dropShadow);
			modal.classList.remove('show');
			modal.style.display = 'none';
		}

	}

{{REGISTERELEMENT}} /* This will be replaced by the build script */
})();
