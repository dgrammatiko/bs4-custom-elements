---
title: Alert documentation
permalink: alert-doc.html
---

## Alerts

In order to use the alert custom element you need to import the element in the document's head:
```html
<link rel="import" href="dgt41-alert.html">
```

The default markup for bootstrap alerts:
```html
<div class="alert alert-info alert-dismissible fade show" role="alert">
  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
	<strong>Heads up!</strong> This alert needs your attention, but it's not super important.
</div>
<div class="alert alert-success alert-dismissible fade show" role="alert">
  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
	<strong>Well done!</strong> You successfully read this important alert message.
</div>
<div class="alert alert-warning" role="alert">
	<strong>Warning!</strong> Better check yourself, you're not looking too good.
</div>
<div class="alert alert-danger alert-dismissible fade show" role="alert">
  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
	<strong>Oh snap!</strong> Change a few things up and try submitting again.
</div>
```

And the simplified version of the custom elements
```html
<dgt41-alert data-type="info" data-button="true">
	<strong>Heads up!</strong> This alert needs your attention, but it's not super important.
</dgt41-alert>
<dgt41-alert data-type="success" data-button="true">
	<strong>Well done!</strong> You successfully read this important alert message.
</dgt41-alert>
<dgt41-alert data-type="warning">
	<strong>Warning!</strong> Better check yourself, you're not looking too good.
</dgt41-alert>
<dgt41-alert data-type="danger" data-button="true">
	<strong>Oh snap!</strong> Change a few things up and try submitting again.
</dgt41-alert>
```

## Dismissing
No need for extra javascript, it’s possible to dismiss any alert inline. Here’s how:

Add a 'data-button="true"'
That's it!!! Now clicking (or focusing on the x button and pressing enter or space -Yes it's accessible day 1) will close the alert!!!

## JavaScript behavior
### Triggers

Enable dismissal of an alert via JavaScript:
```js
element.close()
```

Change the alert type:
```js
element.setAttribute('data-type', 'warning')
```

Remove or add the close button:
```js
element.setAttribute('data-button', 'true')
```

## Events
The custom element exposes a few events for hooking into alert functionality.


|Event			|Description								     			|
|-----------------------|-----------------------------------------------------------------------------------------------|
|close.bs.alert		|This event fires immediately when the close instance method is called.				|
|closed.bs.alert	|This event is fired when the alert has been closed (will wait for CSS transitions to complete).|


Example:
Add some functonality when the alert is closing (right before the css transition start):
```js
element.addEventListener('close.bs.alert', function() {alert('Impressed!')} )
```

Add some functonality when the alert is closed (right after the css transition ends):
```js
element.addEventListener('closed.bs.alert', function() {alert('Very impressive!')} )
```
