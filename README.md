# KoBindings
[Knockout.js](http://knockoutjs.com/) custom bindings

## List of bindings
1. ko-multi-select-binding - custom binding for [multiple-select](http://wenzhixin.net.cn/p/multiple-select/docs/) jQuery plugin

##1. ko-multi-select-binding
A KnockoutJS custom binding that applies a [multiple-select](http://wenzhixin.net.cn/p/multiple-select/docs/) to the standart 'select' element

###Setup & Dependencies
  1.  jQuery 1.11.2 or later
  2.  KnockoutJS 3.2.0 or later  
  3.  jQuery plugin for multiple-select 1.1.0 or later

```html
<head>
    <link rel="stylesheet" href="libs/MultipleSelect/css/multiple-select.css" />
</head>
<body>
    <script src="libs/jQuery/jquery-1.11.2.min.js"></script>
    <script src="libs/MultipleSelect/js/jquery.multiple.select.js"></script>
    <script src="libs/Knockout/knockout-3.2.0.js"></script>
    <script src="../src/ko-multi-select-binding.js"></script>
</body>
```

###Usage
A simple multi-select

```html
<select data-bind="options: myObservableArray, multiSelect: {selectedValues: myObservableArrayWithSelectedItems}"></select>
```

Design your own multi-select using http://wenzhixin.net.cn/p/multiple-select/docs/ to build the `multiSelectConfig` object.

```html
<select data-bind="options: myObservableArray, multiSelect: {selectedValues: myObservableArrayWithSelectedItems, multiSelectConfig: {placeholder: 'Here is the placeholder', selectAll: false}}"></select>
```

###Examples
**Example: Multi select with selected items**

```js
<script type="text/javascript">
    var viewModel = {
        // These are the initial options
        availableMonthes: ko.observableArray(['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']),
        
        // 'February', 'March' are selected by default
	    selectedMonthes: ko.observableArray(['February', 'March'])
    };
</script>
```

```html
<select data-bind="options: availableMonthes, multiSelect: {selectedValues: selectedMonthes, multiSelectConfig: {placeholder: 'Here is the placeholder', selectAll: true}}"></select>
```

See more working examples https://github.com/Sufflavus/KoBindings/blob/master/demos/multiple-select.html

###Parameters
* selectedValues: an observable array with selected items.
* multiSelectConfig: set specific settings for multi-select plugin

## LICENSE
[The MIT License](https://github.com/Sufflavus/KoBindings/blob/master/LICENSE)
