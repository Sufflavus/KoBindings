// Custom binding for dropzonejs jQuery plugin
// http://www.dropzonejs.com/
// https://github.com/enyo/dropzone/tree/master/dist

ko.bindingHandlers.dropzone = function($, ko, Dropzone) {

    function init(element, valueAccessor, allBindings, viewModel, bindingContext) {		    	        
        var bindingValue = valueAccessor() || {};        
        var onUploadComplete = bindingValue.onUploadComplete;
        var dropzoneOptions = bindingValue.dropzoneOptions || {};            
        dropzoneOptions.init = initDropzone;
        
        var $element = $(element);
        var elementId = "dz" + (new Date()).getTime();
        $element.attr("id", elementId);

        Dropzone.options[elementId] = dropzoneOptions;       

        $element.addClass("dropzone");    

        function initDropzone(){
            this.on("complete", function (file) { 
                console.log(file);     
                if(file.status == "error"){          
                    //this.removeFile(file);
                }
                if (onUploadComplete) {
                    onUploadComplete(file);
                }
            });            
        }            
	}
	
	function update(element, valueAccessor, allBindings) {        
    }
	
    return {
        init: init,
        update: update
    };	
	
}(jQuery, ko, Dropzone);