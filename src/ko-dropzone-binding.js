// Custom binding for dropzonejs jQuery plugin
// http://www.dropzonejs.com/
// https://github.com/enyo/dropzone/tree/master/dist
//
// @author Sufflavus https://github.com/Sufflavus
// @version 1.1.0 

ko.bindingHandlers.dropzone = function($, ko, Dropzone) {

    function init(element, valueAccessor, allBindings, viewModel, bindingContext) {		    	        
        var bindingValue = valueAccessor() || {};               
        var dropzoneOptions = bindingValue.dropzoneOptions || {};            

        var $element = $(element);
        var elementId = "dz" + (new Date()).getTime();
        $element.attr("id", elementId);

        Dropzone.options[elementId] = dropzoneOptions;       

        $element.addClass("dropzone");           
	}
	
	function update(element, valueAccessor, allBindings) {        
    }
	
    return {
        init: init,
        update: update
    };	
	
}(jQuery, ko, Dropzone);