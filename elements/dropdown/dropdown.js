(function () {
    // walk up the tree till tagName
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

    var ElementPrototype = Object.create(HTMLElement.prototype);

    // Lifecycle methods
    ElementPrototype.createdCallback = function () {
    };

    ElementPrototype.attachedCallback = function () {
        var button = this.querySelector('button.dropdown-toggle');
        var link = this.querySelector('a.dropdown-toggle');
        var innerLinks = this.querySelectorAll('.dropdown-menu > a');
        var triggerEl;

        if (!button && !link) return;

        if (button) {
            triggerEl = button;
        } else {
            triggerEl = link;
        }

        if (!triggerEl.id) return;
        //var children = [].slice.call( menu[getElementsByTagName]('*'));
        this.classList.add('dropdown');
        this.style.display = 'block';
        triggerEl.setAttribute('aria-haspopup', 'true');
        triggerEl.setAttribute('aria-expanded', 'false');

        triggerEl.addEventListener('click', function (event) {
            var container = upTo(event.target, 'dgt41-dropdown');

            if (container && container.classList.contains('show')) {
                container.classList.remove('show');
                event.target.setAttribute('aria-expanded', 'false')
            } else {
                container.classList.add('show');
                event.target.setAttribute('aria-expanded', 'true')
            }
        });

        for (var i = 0, l = innerLinks.length; i < l; i++) {
            innerLinks[i].addEventListener('click', function (event) {
                var container = upTo(event.target, 'dgt41-dropdown');
                container.close();
            })
        }
    };

    ElementPrototype.detachedCallback = function () {
    };

    // Custom methods
    ElementPrototype.close = function () {
        var button = this.querySelector('.dropdown-toggle');
        this.classList.remove('show');
        button.setAttribute("aria-expanded", "false");
    };

    // // Attribute handlers
    // var attrs = {
    //     'attr': function (oldVal, newVal) {

    //     }
    // };

    // ElementPrototype.attributeChangedCallback = function (attr, oldVal, newVal) {
    //     if (attr in attrs) {
    //         attrs[attr].call(this, oldVal, newVal);
    //     }
    // };

    // // Property handlers
    // Object.defineProperties(ElementPrototype, {
    //     'prop': {
    //         get: function () {

    //         },
    //         set: function (newVal) {

    //         }
    //     }
    // });

    // Register the element
    window.CustomElement = document.registerElement('dgt41-dropdown', { prototype: ElementPrototype });

})();