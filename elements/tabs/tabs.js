(function () {

	class TabsElement extends HTMLElement {
		constructor() {
			super();
		}
		/* Attributes to monitor */
		// static get observedAttributes() { return ['type', 'toggle']; }

		/* Called when the element is inserted into a document */
		connectedCallback() {

			var tabsContainer = this.querySelector('div.tab-content'),
				theUl = this.querySelector('ul[role="tablist"]'),
				theLis = theUl.querySelectorAll('li');

			for (var i = 0; i < theLis.length; i++) {
				var linkable = theLis[i].querySelector('a[data-toggle="tab"]');
				linkable.addEventListener('click', function (event) {
					event.preventDefault();
					var lol = event.target.getAttribute('aria-controls')

					var allTabs = tabsContainer.querySelectorAll('.tab-pane')

					// Reset Tabs content
					for (var i = 0; i < allTabs.length; i++) {
						allTabs[i].classList.remove('show', 'active')
					}
					// Reset Tabs nav
					for (var i = 0; i < theLis.length; i++) {
						theLis[i].querySelector('a[data-toggle="tab"]').classList.remove('active')

					}
					event.target.classList.add('active')
					var activeEl = tabsContainer.querySelector('#' + lol)
					activeEl.classList.add('show', 'active')
				})

				var obj = theLis[i];

			}
			//				triggerBtn.addEventListener('click', function() {
			//					modal.classList.add('in');
			//					modal.classList.remove('fade');
			//
			//					modal.style.display = 'block';
			//
			//				})

			// Is there a close button?
			//				var tabsButton = tabs.querySelectorAll('button');
			//
			//				for (var i = 0, l = modalButton.length; i < l; i++) {
			//					if (modalButton[i].getAttribute('data-dismiss') === 'modal' || modalButton[i].parentNode.classList.contains('modal-footer')) {
			//						// close
			//						modalButton[i].addEventListener('click', function(event) {
			//
			//							modal.classList.add('fade');
			//							modal.classList.remove('in');
			//							modal.style.display = 'none';
			//						})
			//
			//					}
			//
			//
			//				}

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

