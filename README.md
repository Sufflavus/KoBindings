# KoBindings
[Knockout.js](http://knockoutjs.com/) custom bindings

## List of bindings
1. ko-multiple-select-binding - custom binding for [Multiple select](http://wenzhixin.net.cn/p/multiple-select/docs/) jQuery plugin

2. ko-dropzone-binding - custom binding for [dropzonejs](http://www.dropzonejs.com/)

##1. ko-multiple-select-binding
A KnockoutJS custom binding that applies a [Multiple select](http://wenzhixin.net.cn/p/multiple-select/docs/) to the standart 'select' element

###Setup & Dependencies
  1.  [jQuery](http://jquery.com/download/) 1.11.2 or later
  2.  [KnockoutJS](http://knockoutjs.com/downloads/index.html) 3.2.0 or later  
  3.  jQuery plugin [Multiple select](http://wenzhixin.net.cn/p/multiple-select/docs/) 1.1.0 or later
  4.  ko-multiple-select-binding.js

```html
<head>
    <link rel="stylesheet" href="libs/MultipleSelect/css/multiple-select.css" />
</head>
<body>

    <script src="libs/jQuery/jquery-1.11.2.min.js"></script>
    <script src="libs/MultipleSelect/js/jquery.multiple.select.js"></script>
    <script src="libs/Knockout/knockout-3.2.0.js"></script>
    <script src="../src/ko-multiple-select-binding.js"></script>
</body>
```

###Usage
A simple multiple-select

```html
<select data-bind="options: myObservableArray, 
    multipleSelect: {selectedValues: myObservableArrayWithSelectedItems}">
</select>
```

`multipleSelectConfig` parameter is used to configure a multiple-select plugin. Use [documentation](http://wenzhixin.net.cn/p/multiple-select/docs/) to build `multipleSelectConfig` object.  

```html
<select data-bind="options: myObservableArray, 
    multipleSelect: {selectedValues: myObservableArrayWithSelectedItems, 
    multipleSelectConfig: {placeholder: 'Here is the placeholder', selectAll: false}}">
</select>
```

###Examples
**Example: Multiple select with selected items**

```js
<script type="text/javascript">
    var viewModel = {
        // These are the initial options
        availableMonthes: ko.observableArray(['January', 'February', 'March', 'April', 
            'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']),
        
        // 'February', 'March' are selected by default
	    selectedMonthes: ko.observableArray(['February', 'March'])
    };
</script>
```

```html
<select data-bind="options: availableMonthes, 
    multipleSelect: {selectedValues: selectedMonthes, 
    multipleSelectConfig: {placeholder: 'Here is the placeholder', selectAll: true}}">
</select>
```

See more working [examples](https://github.com/Sufflavus/KoBindings/blob/master/demos/multiple-select.html)

###Parameters
* selectedValues: an observable array with selected items.
* multipleSelectConfig: set specific settings for multiple-select plugin (regular js-object)

##2. ko-dropzone-binding
A KnockoutJS custom binding that applies a [dropzone](http://www.dropzonejs.com/) to the standart 'div' element

###Setup & Dependencies
  1.  [jQuery](http://jquery.com/download/) 1.11.2 or later
  2.  [KnockoutJS](http://knockoutjs.com/downloads/index.html) 3.2.0 or later  
  3.  [Dropzonejs](http://www.dropzonejs.com/) 4.0.0 or later
  4.  ko-dropzone-binding.js

```html
<head>
    <link rel="stylesheet" href="libs/Dropzone/css/basic.css" />
    <link rel="stylesheet" href="libs/Dropzone/css/dropzone.css" />
</head>
<body>

    <script src="libs/jQuery/jquery-1.11.2.min.js"></script>    
    <script src="libs/Knockout/knockout-3.2.0.js"></script>
    <script src="libs/Dropzone/js/dropzone.js"></script>        
    <script src="../src/ko-dropzone-binding.js"></script>    
</body>
```
###Usage
A simple dropzone

```html
<div data-bind="dropzone: { dropzoneOptions: {url: fileUploadUrl } }">
</div>     
```

`dropzoneOptions` parameter is used to configure a Dropzone plugin. Use [documentation](http://www.dropzonejs.com/#configuration-options) to build `dropzoneOptions` object. You might also add [events'](http://www.dropzonejs.com/#configuration-options) handlers in dropzoneOptions, eg [init](http://www.dropzonejs.com/#config-init) or [complete](http://www.dropzonejs.com/#event-complete) etc.

```html
<div data-bind="dropzone: { dropzoneOptions: {url: fileUploadUrl, acceptedFiles: '.png', uploadMultiple: true, init: initDropzone, complete: onUploadComplete } }"> 
</div>
```

###Examples
**Example: Simple file upload with call back after file uploaded**

```js
<script type="text/javascript">
    var viewModel = {
      fileUploadUrl: "http://localhost:8090",
      acceptedFiles: ".png",
      onUploadComplete: function(file){
        console.log(file);
      }
    };
</script>
```

```html
<div data-bind="dropzone: { dropzoneOptions: {url: fileUploadUrl, acceptedFiles: acceptedFiles, uploadMultiple: true, complete: onUploadComplete } }">    
</div>
```

See working [example](https://github.com/Sufflavus/KoBindings/blob/master/demos/dropzone.html)

###Parameters
* dropzoneOptions: set specific settings for dropzonejs plugin (regular js-object)

**Note:** Parameter [url](http://www.dropzonejs.com/#config-url) has to be specified in object dropzoneOptions. You can also provide a function that will be called with files and must return the url  

## LICENSE
[The MIT License](https://github.com/Sufflavus/KoBindings/blob/master/LICENSE)
