(function () {
    var doc = (document._currentScript || document.currentScript).ownerDocument,
        template = doc.getElementById('dgt41-collapse'),
        ElementPrototype = Object.create(HTMLElement.prototype);

    // Lifecycle methods
    ElementPrototype.createdCallback = function () {

    };

    ElementPrototype.attachedCallback = function () {
        // id is required
        if (!this.id) return;

        var linked = document.querySelectorAll('[href="#' + this.id + '"],[data-target="#' + this.id + '"]');

        for (var i = 0, l = linked.length; i < l; i++) {
            if (!this['data-state'] || this['data-state'] === "closed") {
                linked[i].setAttribute('aria-expanded', 'false');
                linked[i].setAttribute('aria-controls', this.id);
                this.classList.remove('show')
            } else {
                linked[i].setAttribute('aria-expanded', 'true');
                linked[i].setAttribute('aria-controls', this.id);
                this.classList.add('show');
            }

            linked[i].addEventListener('click', function(event) {

                if (!event.target.hasAttribute('data-target')) colId = event.target.getAttribute('href').replace('#', '');
                if (!event.target.hasAttribute('href')) colId = event.target.getAttribute('data-target').replace('#', '');
                event.preventDefault();
                event.stopPropagation();
                document.getElementById(colId).toggle();
            })
        }

        // Without the shadow DOM, we have to manipulate the custom element
        // after it has been inserted in the DOM.
        var temp = document.importNode(template.content, true);
        this.appendChild(temp);
    };

    ElementPrototype.detachedCallback = function () {

    };

    ElementPrototype.attributeChangedCallback = function (attr, oldVal, newVal) {
        if (attr in attrs) {
            attrs[attr].call(this, oldVal, newVal);
        }
    };

    // Custom methods
    ElementPrototype.toggle = function () {
        var linked = document.querySelector('[href="#' + this.id + '"]');
        if (!linked) linked = document.querySelector('[data-target="#' + this.id + '"]');
        if (this['data-state'] === "closed") {
            linked.setAttribute('aria-expanded', 'true');
        } else {
            linked.setAttribute('aria-expanded', 'false');
        }
        this.classList.toggle('show');
    };

    // Attribute handlers
    var attrs = {
        'attr': function (oldVal, newVal) {
            var linked = document.querySelector('[href="#' + this.id + '"]');
            if (newVal === "closed") {
                linked.setAttribute('aria-expanded', 'false');
            } else if (newVal === "open") {
                linked.setAttribute('aria-expanded', 'true');
            }
        }
    };

    // Property handlers
    Object.defineProperties(ElementPrototype, {
        'data-state': {
            get : function () {
                return this.getAttribute('data-state');
            },
            set : function (newVal) {
                this.setAttribute('data-state', newVal);
            }
        }
    });

    // Register the element
    window.CustomElement = document.registerElement('dgt41-collapse', { prototype: ElementPrototype });

})();