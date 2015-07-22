// Custom binding for dropzonejs jQuery plugin
// http://www.dropzonejs.com/
// https://github.com/enyo/dropzone/tree/master/dist

ko.bindingHandlers.dropzone = function(ko, Dropzone) {

	function init(element, valueAccessor, allBindings, viewModel, bindingContext) {			
		debugger;	
        Dropzone.autoDiscover = false;	
        var dropzoneOptions = valueAccessor() || {};        
        var onUploadComplete = dropzoneOptions.onUploadComplete;
        dropzoneOptions.onUploadComplete = null;
        //dropzoneOptions.autoDiscover = false;
        var $element = $(element);
        //var elementId = "dropzone" + (new Date()).getTime();
        //$element.attr("id", elementId);
        //Dropzone.options[elementId] = dropzoneOptions;
        var myDropzone = $element.dropzone(dropzoneOptions);
        //myDropzone.addClass("dropzone");

        myDropzone.on("complete", function (file) {                
            myDropzone.removeFile(file);
            if (onUploadComplete) {
                onUploadComplete(file);
            }
        });

		//$("div#mydiv").dropzone({ url: "/file/post" });

		//var myDropzone = new Dropzone("div#mydiv", { url: "/file/post"});
	}
	
	function update(element, valueAccessor, allBindings) {        
    }
	
    return {
        init: init,
        update: update
    };	
	
}(ko, Dropzone);