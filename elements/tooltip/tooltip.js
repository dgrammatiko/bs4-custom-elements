(function () {
    const doc = (document._currentScript || document.currentScript).ownerDocument;

    ElementPrototype = Object.create(HTMLElement.prototype);

    /*<div class="tooltip tooltip-top" role="tooltip">
        <div class="tooltip-inner">Tooltip on the top</div>
    </div>*/
    var mouseHover = ('onmouseleave' in document) ? ['mouseenter', 'mouseleave'] : ['mouseover', 'mouseout'];
    var getScroll = function () { // also Affix and ScrollSpy uses it
            return {
                y: this.pageYOffset || document.documentElement.scrollTop,
                x: this.pageXOffset || document.documentElement.scrollLeft
            }
        };

   var styleTip = function (link, element, position, container) { // both popovers and tooltips
       var rect = link.getBoundingClientRect(),
           scroll = container === document.body ? getScroll() : { x: container.offsetLeft + container.scrollLeft, y: container.offsetTop + container.scrollTop },
            linkDimensions = { w: rect.right - rect.left, h: rect.bottom - rect.top },
            elementDimensions = { w: element.offsetWidth, h: element.offsetHeight };

        // apply styling to tooltip or popover
        if (position === 'top') { // TOP
            element.style.top = rect.top + scroll.y - elementDimensions.h + 'px';
            element.style.left = rect.left + scroll.x - elementDimensions.w / 2 + linkDimensions.w / 2 + 'px'

        } else if (position === 'bottom') { // BOTTOM
            element.style.top = rect.top + scroll.y + linkDimensions.h + 'px';
            element.style.left = rect.left + scroll.x - elementDimensions.w / 2 + linkDimensions.w / 2 + 'px';

        } else if (position === 'left') { // LEFT
            element.style.top = rect.top + scroll.y - elementDimensions.h / 2 + linkDimensions.h / 2 + 'px';
            element.style.left = rect.left + scroll.x - elementDimensions.w + 'px';

        } else if (position === 'right') { // RIGHT
            element.style.top = rect.top + scroll.y - elementDimensions.h / 2 + linkDimensions.h / 2 + 'px';
            element.style.left = rect.left + scroll.x + linkDimensions.w + 'px';
        }
    };

    var updatePlacement = function (position) {
        return position === 'top' ? 'bottom' : // top
            position === 'bottom' ? 'top' : // bottom
            position === 'left' ? 'right' : // left
            position === 'right' ? 'left' : position; // right
    };

    var tipBehaviour = function(elem) {
        var cont = document.createElement('div');
        var tipEl = document.createElement('div');
        var position = elem.getAttribute('data-placement');
        var posRef = 'beforebegin';
        if (position) {
            cont.classList.add('tooltip'); cont.setAttribute('role', 'tooltip');
            tipEl.classList.add('tooltip-inner');
            cont.classList.add('fade');
            cont.classList.add('show');
            cont.style.zIndex = 1060;
            switch (position) {
                case 'top':
                    cont.classList.add('tooltip-top');
                    tipEl.innerHTML = elem.getAttribute('title');
                    cont.appendChild(tipEl)
                    document.body.insertAdjacentElement('beforeend', cont);
                    elem.removeAttribute('title');
                    styleTip(elem, cont, 'top', document.body)

                    break;
                case 'left':
                    cont.classList.add('tooltip-left');
                    tipEl.innerHTML = elem.getAttribute('title');
                    cont.appendChild(tipEl)
                    document.body.insertAdjacentElement('beforeend', cont);
                    elem.removeAttribute('title');
                    styleTip(elem, cont, 'left', document.body)

                    break;
                case 'right':
                    cont.classList.add('tooltip-right');
                    tipEl.innerHTML = elem.getAttribute('title');
                    cont.appendChild(tipEl)
                    document.body.insertAdjacentElement('beforeend', cont);
                    elem.removeAttribute('title');
                    styleTip(elem, cont, 'right', document.body)

                    break;
                case 'bottom':
                    cont.classList.add('tooltip-bottom');
                    tipEl.innerHTML = elem.getAttribute('title');
                    cont.appendChild(tipEl)
                    document.body.insertAdjacentElement('beforeend', cont);
                    elem.removeAttribute('title');
                    styleTip(elem, cont, 'bottom', document.body)
                    break;
                default:
                    break;
            }
        }
    };

    var distroyTip = function(elem) {
        var tipEl = document.querySelector('.tooltip.fade.show');
        elem.setAttribute('title', tipEl.childNodes[0].innerHTML);
        if (tipEl) tipEl.parentNode.removeChild(tipEl);
    };

    // Lifecycle methods
    ElementPrototype.createdCallback = function () {

    };

    ElementPrototype.attachedCallback = function () {
        var allTips = document.querySelectorAll('[data-toggle="tooltip"]');
        for (var i = 0, l = allTips.length; i < l; i++)
        {
            allTips[i].addEventListener(mouseHover[0], function(e) {
                timer = setTimeout(function () {
                    tipBehaviour(e.target);
                    e.target.addEventListener(mouseHover[1], function (ev) {
                        distroyTip(ev.target);
                        ev.target.removeEventListener(mouseHover[1], arguments.callee);
                    })
                }, 2);
            })
        }

        // Without the shadow DOM, we have to manipulate the custom element
        // after it has been inserted in the DOM.
        // var temp = document.importNode(template.content, true);
        // this.appendChild(temp);
    };

    ElementPrototype.detachedCallback = function () {

    };


    // Register the element
    document.registerElement('dgt41-tooltip', { prototype: ElementPrototype });
})();

(function(){
    var xxx = document.createElement('dgt41-tooltip');
    document.body.appendChild(xxx);
})();