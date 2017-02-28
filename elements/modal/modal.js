
(function () {

    var ElementPrototype = Object.create(HTMLElement.prototype);

    // Lifecycle methods
    ElementPrototype.createdCallback = function () { };

    ElementPrototype.attachedCallback = function () {
        var modal = this.querySelector('.modal');
        triggerBtn = document.querySelector("button[data-target=\"#" + modal.id + "\"]");
        if (triggerBtn) {
            triggerBtn.addEventListener('click', function (ev) {
                var dropShadow = document.createElement('div'),
                    modalContent = this.querySelector('.modal-content');
                dropShadow.classList.add('modal-backdrop', 'show');
                document.body.appendChild(dropShadow);
                modal.classList.toggle('show');
                modal.style.display = 'block';
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
                        modalEl = getParents(openModal, 'dgt41-modal')[0],
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
                var elm = getParents(event.target, 'dgt41-modal');
                elm[0].close();
            });
        }
    };

    ElementPrototype.detachedCallback = function () {

    };

    ElementPrototype.attributeChangedCallback = function (attr, oldVal, newVal) {
        if (attr in attrs) {
            attrs[attr].call(this, oldVal, newVal);
        }
    };

    // Custom methods
    ElementPrototype.close = function () {
        var dropShadow = document.querySelector('.modal-backdrop');
        var modal = this.querySelector('.modal');
        if (dropShadow) document.body.removeChild(dropShadow);
        modal.classList.toggle('show');
        modal.style.display = 'none';
    }

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

    // Attribute handlers
    var attrs = {
        'attr': function (oldVal, newVal) {

        }
    };

    // Property handlers

    Object.defineProperties(ElementPrototype, {
        'prop': {
            get: function () {

            },
            set: function (newVal) {

            }
        }
    });

    // Register the element

    window.CustomElement = document.registerElement('dgt41-modal', {
        prototype: ElementPrototype
    });

})();
