(function () {

    var ElementPrototype = Object.create(HTMLElement.prototype);

    // Lifecycle methods
    ElementPrototype.createdCallback = function () {
    };

    ElementPrototype.attachedCallback = function () {
        // Return early if no content is given
        if (!this.innerHTML) {
            return;
        }

        this.setAttribute('role', 'alert');
        this.classList.add("fade");
        this.classList.add("show");

        if (this['data-type'] && ['info', 'success', 'warning', 'danger'].indexOf(this['data-type']) > -1) {
            if (this['data-type'] === 'success') {
                this.classList.add('alert-success');
            }
            if (this['data-type'] === 'danger') {
                this.classList.add('alert-danger');
            }
            if (this['data-type'] === 'info') {
                this.classList.add('alert-info');
            }
            if (this['data-type'] === 'warning') {
                this.classList.add('alert-warning');
            }
        } else {
            this.classList.add('alert-info');
        }

        if (this['data-button'] && this['data-button'] === "true") {
            this.appendCloseButton();
        }
    };

    ElementPrototype.detachedCallback = function () {
        this.removeEventListener('close.bs.alert', arguments.callee);
        this.removeEventListener('closed.bs.alert', arguments.callee);
        this.firstChild.removeEventListener('click', arguments.callee);
    };

    ElementPrototype.attributeChangedCallback = function (attr, oldVal, newVal) {
        if (attr in attrs) {
            attrs[attr].call(this, oldVal, newVal);
        }
    };

    // Custom methods
    // Close the alert (and destroy the element)
    ElementPrototype.close = function () {
        // To trigger the event close.bs.alert:
        // this.addEventListener('close.bs.alert', function(){alert('yeye')}, false);
        // To trigger the event closed.bs.alert:
        // this.addEventListener('closed.bs.alert', function(){alert('haha')}, false);

        this.dispatchCustomEvent('close.bs.alert');
        

        if ('WebkitTransition' in document.documentElement.style || 'transition' in document.documentElement.style) {
            this.addEventListener("transitionend", function(event) {
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


    // Dispatch the closed event
    ElementPrototype.dispatchCustomEvent = function(eventName) {
        var OriginalCustomEvent = new CustomEvent(eventName);
        OriginalCustomEvent.relatedTarget = this;
        this.dispatchEvent(OriginalCustomEvent);
        this.removeEventListener(eventName, arguments.callee);
    };

    // Create the close button
    ElementPrototype.appendCloseButton = function() {
        if (!this.querySelector('button[aria-label="Close"]')) {
            var closeButton = document.createElement('button');
            closeButton.setAttribute('type', 'button');
            closeButton.setAttribute('aria-label', 'Close');
            closeButton.classList.add('close');
            closeButton.innerHTML = '<span aria-hidden="true">&times;</span>';

            if (this.firstChild) this.insertBefore(closeButton,this.firstChild);
            else this.appendChild(closeButton);

            // Add the required listener
            this.firstChild.addEventListener('click', function(event) {
                var element = event.target;
                if (event.target.parentNode.tagName.toLowerCase() === 'button') {
                    element = event.target.parentNode;
                }

                element.parentNode.close();                
            });
        }
    };

    // Remove the close button
    ElementPrototype.removeCloseButton = function() {
        if (this.querySelector('button[aria-label="Close"]')) {
            this.firstChild.removeEventListener('click', arguments.callee);
            this.removeChild(this.firstChild);
        }
    };

    // Attribute handlers
    var attrs = {
        'data-type': function (oldVal, newVal) {
            if (this.classList.contains('alert-' + oldVal) && ['info', 'warning', 'danger', 'success'].indexOf(newVal) > -1) {
                this.classList.remove('alert-' + oldVal);
                this.classList.add('alert-' + newVal);
            }
        },
        'data-button': function (oldVal, newVal) {
            if (oldVal === "true" && newVal === "false")
                this.removeCloseButton();
            if (oldVal === "false" && newVal === "true")
                this.appendCloseButton();
        }
    };

    // Property handlers
    Object.defineProperties(ElementPrototype, {
        'data-type': {
            get : function () {
                return this.getAttribute('data-type');
            },
            set : function (newVal) {
                this.setAttribute('data-type', newVal);
            }
        },
        'data-button': {
            get : function () {
                return this.getAttribute('data-button');
            },
            set : function (newVal) {
                this.setAttribute('data-button', newVal);
            }
        }
    });

    // Register the element
    document.registerElement('dgt41-alert', { prototype: ElementPrototype });
})();