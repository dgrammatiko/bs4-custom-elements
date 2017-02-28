(function () {

	var ElementPrototype = Object.create(HTMLElement.prototype);

	// Lifecycle methods
	ElementPrototype.createdCallback = function () {

	};

	ElementPrototype.attachedCallback = function () {

		var tabsContainer = this.querySelector('div.tab-content'),
			theUl = this.querySelector('ul[role="tablist"]'),
			theLis = theUl.querySelectorAll('li');

		for (var i = 0; i < theLis.length; i++) {
			var linkable = theLis[i].querySelector('a[data-toggle="tab"]');
			linkable.addEventListener('click', function(event) {
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
				activeEl = tabsContainer.querySelector('#' + lol)
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

	};

	ElementPrototype.detachedCallback = function () {

	};

	ElementPrototype.attributeChangedCallback = function (attr, oldVal, newVal) {
		if (attr in attrs) {
			attrs[attr].call(this, oldVal, newVal);
		}
	};

	// Custom methods

	ElementPrototype.foo = function () {

	};

	// Attribute handlers

	var attrs = {
		'attr': function (oldVal, newVal) {

		}
	};

	// Property handlers

	Object.defineProperties(ElementPrototype, {
		'prop': {
			get : function () {

			},
			set : function (newVal) {

			}
		}
	});

	// Register the element

	window.CustomElement = document.registerElement('dgt41-tabs', {
		prototype: ElementPrototype
	});

})();
