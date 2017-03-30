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

	class CarouselElement extends HTMLElement {

		/* Attributes to monitor */
		static get observedAttributes() { return ['attribute']; }

		/* Called when the element is inserted into a document */
		connectedCallback() {
			var content = this.innerHTML;
			var elHeight, elWidth;

			if (!this.innerHTML) return;

			this.innerHTML = '';
			var container = document.createElement('div');
			container.classList.add('carousel');
			container.classList.add('slide');
			container.innerHTML = content;
			this.appendChild(container);

			var orderedListCont = this.querySelector('.carousel-indicators');
			if (orderedListCont)
				var liElems = orderedListCont.querySelectorAll('li');
			if (liElems)
				for (var i = 0, l = liElems.length; i < l; i++) {
					liElems[i].setAttribute('data-slide-to', i);
					liElems[i].addEventListener('click', function (event) {
						event.preventDefault();
						var container = upTo(event.target, 'bs4-carousel');
						container.resetAll();
						var slides = container.querySelectorAll('.carousel-item');
						event.target.classList.add('active');
						slides[parseInt(event.target.getAttribute('data-slide-to'))].classList.add('active');
					})
				}


			// var activeEl = container.querySelector('.active');
			// container.style.height = activeEl.style.height

			var prevBtn = this.querySelector('.carousel-control-prev');
			var nextBtn = this.querySelector('.carousel-control-next');

			if (prevBtn) {
				prevBtn.addEventListener('click', function (event) {
					event.preventDefault();
					var container = upTo(event.target, 'bs4-carousel');
					container.setPrevious();
				})
			}
			if (nextBtn) {
				nextBtn.addEventListener('click', function (event) {
					event.preventDefault();
					var container = upTo(event.target, 'bs4-carousel');
					container.setNext();
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

		setPrevious() {
			var slides = this.querySelectorAll('.carousel-item');
			var orderedListCont = this.querySelector('.carousel-indicators');
			var liElems = orderedListCont.querySelectorAll('li');
			var elHeight, elWidth;
			if (slides[0].classList.contains('active')) {
				slides[0].classList.remove('active');
				liElems[0].classList.remove('active');
				slides[slides.length - 1].classList.add('active');
				liElems[slides.length - 1].classList.add('active');
			} else {
				for (var i = 0, l = slides.length; i < l; i++) {
					if (slides[i].classList.contains('active')) {
						slides[i].classList.remove('active');
						liElems[i].classList.remove('active');
						slides[i - 1].classList.add('active');
						liElems[i - 1].classList.add('active');
						break;
					}
				}
			}
		}

		setNext() {
			var slides = this.querySelectorAll('.carousel-item');
			var orderedListCont = this.querySelector('.carousel-indicators');
			var liElems = orderedListCont.querySelectorAll('li');
			var elHeight, elWidth;
			if (slides[slides.length - 1].classList.contains('active')) {
				slides[slides.length - 1].classList.remove('active');
				liElems[slides.length - 1].classList.remove('active');
				slides[0].classList.add('active');
				liElems[0].classList.add('active');
			} else {
				for (var i = 0, l = slides.length; i < l; i++) {
					if (slides[i].classList.contains('active')) {
						slides[i].classList.remove('active');
						liElems[i].classList.remove('active');
						slides[i + 1].classList.add('active');
						liElems[i + 1].classList.add('active');
						break;
					}
				}
			}
		}

		resetAll() {
			var slides = this.querySelectorAll('.carousel-item');
			var orderedListCont = this.querySelector('.carousel-indicators');
			var liElems = orderedListCont.querySelectorAll('li');
			for (var i = 0, l = slides.length; i < l; i++) {
				if (slides[i].classList.contains('active')) {
					slides[i].classList.remove('active');
					liElems[i].classList.remove('active');
					break;
				}
			}
		}
	}

{{REGISTERELEMENT}} /* This will be replaced by the build script */
})();
