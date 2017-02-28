(function () {
    var doc = (document._currentScript || document.currentScript).ownerDocument,
    template = doc.getElementById('dgt41-button'),
    ElementPrototype = Object.create(HTMLElement.prototype);

    // Lifecycle methods
    ElementPrototype.createdCallback = function () {
    };

    ElementPrototype.attachedCallback = function () {
        // Return early if no content is given
        if (!this.innerHTML || !this['data-toggle']) {
            return;
        }

        // Single button
        if (this['data-toggle'] === 'button') {
            this.removeAttribute('aria-pressed');
            if (this.classList.contains('active')) {
                this.setAttribute('aria-pressed', 'true');
            }
            if (this.getAttribute('type') && this.getAttribute('type') !== 'button') {
                this.setAttribute('type', 'button');
            }
            // No functionality for disabled button
            if (this.getAttribute('disabled')) return;

            this.addEventListener('click', function(event) {
                // No functionality for disabled button
                if (event.target.hasAttribute('disabled')) {
                    event.preventDefault();
                    event.stopPropagation();
                } else {
                    event.target.toggle();
                }
            })
        } else if (this['data-toggle'] === 'buttons') {
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

                    buttons[i].addEventListener('click', function(event) {
                        
                        if (event.target.parentNode.tagName.toLowerCase() === 'label') {
                            
                            if (event.target.checked){
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
                radios = this.querySelectorAll('[type="radio"]');

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

                        radios[i].addEventListener('click', function(event) {

                            if (event.target.parentNode.tagName.toLowerCase() === 'label') {                                
                                if (event.target.checked){
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

        // Without the shadow DOM, we have to manipulate the custom element
        // after it has been inserted in the DOM.
        var temp = document.importNode(template.content, true);
        this.appendChild(temp);
    };

    ElementPrototype.detachedCallback = function () {
        if (this['data-toggle'] === 'button') {
            this.removeEventListener('click', arguments.callee);
        }
    };

    ElementPrototype.attributeChangedCallback = function (attr, oldVal, newVal) {
        if (attr in attrs) {
            attrs[attr].call(this, oldVal, newVal);
        }
    };

    // Custom methods
    ElementPrototype.toggle = function () {
        if (this['data-toggle'] === 'button') {
            this.classList.toggle('active');
            if (this.getAttribute('aria-pressed') && this.getAttribute('aria-pressed') === 'true') {
                this.setAttribute('aria-pressed', 'false');
            } else {
                this.removeAttribute('aria-pressed');
            }
        }
    };

    ElementPrototype.clearAllRadios = function() {
        var radios = this.querySelectorAll('[type="radio"]');
        for (var i = 0, l = radios.length; i < l; i++) {
            radios[i].checked = false;
            radios[i].removeAttribute('checked');
            if (radios[i].parentNode.tagName.toLowerCase() == 'label') {
                radios[i].parentNode.classList.remove('active');
                radios[i].parentNode.setAttribute('aria-pressed', 'false');
            }
        }
    };

    // Attribute handlers
    var attrs = {
        'data-toggle': function (oldVal, newVal) {
            // The change of this property is prohibited
            if (oldVal !== newVal) return;
        }
    };

    // Property handlers
    Object.defineProperties(ElementPrototype, {
        'data-toggle': {
            get : function () {
                return this.getAttribute('data-toggle');
            },
            set : function (newVal) {
                this.setAttribute('data-toggle', newVal);
            }
        }
    });

    // Register the element
    document.registerElement('dgt41-button', { prototype: ElementPrototype });
})();
