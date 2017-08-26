# bs4-custom-elements

[![Greenkeeper badge](https://badges.greenkeeper.io/dgt41/bs4-custom-elements.svg)](https://greenkeeper.io/)

[![Built with Grunt](https://cdn.gruntjs.com/builtwith.svg)](http://gruntjs.com/)
[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/dgt41/bs4-custom-elements)

### Bootstrap components using modern technologies

This is a collection of all the Boostrap (only version 4) components developed with the new W3C standard: custom elements. Each component is using plain and optimized javascript for performance. Also the HTML markup (wherever possible) is reduced as the custom elements support pretty nice methods (shadow DOM namelly) and thus the component can be implemented in a more clever way (without performance penalties).
The aim for the total weight of all the component is to be less than 20Kb minified and less 7Kb gzipped.

### Using the NPM power

You can install this package by using NPM:
```bash
$ npm install bs4-custom-elements --save
```

### Configuration

The prefix of all the elements is configuarable, to do so duplicate the file `settings.yaml` and name the new file as `settings-custom.yaml`. Open the file in your editor and change the prefix to your taste. (it needs to be one word check the W3C speifications for valid custom element naming).
Build your custom elements by executing:
```bash
$ grunt
```
The folder named `dist` contains all your elements.

### Usage

For each component that you need to have available in your page you need to add the custom element in the head of the document:
```html
<link rel="import" href="bs4-alert.html">
```

### Browser support

Although all the major browsers are **committed** to support custom elements some of the **all green browsers** do need a polyfill. A simple script (needs to be inserted before the first import), e.g. the next script taken from the Google Polymer repo  to do that:
```html
<script>
  (function () {
    if ('registerElement' in document
      && 'import' in document.createElement('link')
      && 'content' in document.createElement('template')) {
      // platform is good!
    } else {
      // polyfill the platform!
      var e = document.createElement('script');
      e.src = 'webcomponents-lite.min.js';
      document.head.appendChild(e);
    }
  })();
</script>
```
The repo for the actual polyfill is: https://github.com/webcomponents/webcomponentsjs

### License

The library is released under the [MIT license](LICENSE)
