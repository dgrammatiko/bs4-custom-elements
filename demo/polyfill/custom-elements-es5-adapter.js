'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

(function () {
  'use strict';

  (function () {
    'use strict';
    if (!window.customElements) return;var a = window.HTMLElement,
        b = window.customElements.define,
        c = window.customElements.get,
        d = new Map(),
        e = new Map();var f = !1,
        g = !1;window.HTMLElement = function () {
      if (!f) {
        var h = d.get(this.constructor),
            i = c.call(window.customElements, h);g = !0;var j = new i();return j;
      }f = !1;
    }, window.HTMLElement.prototype = a.prototype, window.customElements.define = function (h, i) {
      var j = i.prototype,
          k = function (_a) {
        _inherits(k, _a);

        function k() {
          var _this;

          _classCallCheck(this, k);

          (_this = _possibleConstructorReturn(this, (k.__proto__ || Object.getPrototypeOf(k)).call(this)), _this), Object.setPrototypeOf(_this, j), g || (f = !0, i.call(_this)), g = !1;return _this;
        }

        return k;
      }(a),
          l = k.prototype;k.observedAttributes = i.observedAttributes, l.connectedCallback = j.connectedCallback, l.disconnectedCallback = j.disconnectedCallback, l.attributeChangedCallback = j.attributeChangedCallback, l.adoptedCallback = j.adoptedCallback, d.set(i, h), e.set(h, i), b.call(window.customElements, h, k);
    }, window.customElements.get = function (h) {
      return e.get(h);
    };
  })();

  /**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
})();