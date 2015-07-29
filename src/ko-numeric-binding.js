// Custom binding for numeric-only values
//
// @author Sufflavus https://github.com/Sufflavus
// @version 1.1.0 

ko.bindingHandlers.numeric = function(ko) {

	function init(element, valueAccessor, allBindings, viewModel, bindingContext) {	
    
        var bindingValue = valueAccessor() || {};  
        var value =  bindingValue.value;    
        var options = bindingValue.numericOptions || {}; 

        if(options){
        	options.min = options.min ? toInt(options.min) : 0;
        	
        	if(options.max){
        		options.max = toInt(options.max);

        		if(options.max < options.min){
        			throw new Error("Max option should be more or equal than Min option");
        		}
        	}        	
        }

        $(element).keydown(function(event) {        	
        	// code from http://stackoverflow.com/questions/17048468/make-an-input-only-numeric-type-on-knockout
            // Allow: backspace, delete, tab
            if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 ||
                // Allow: F5
                (event.keyCode == 116) ||
                // Allow: home, end, left, right
                (event.keyCode >= 35 && event.keyCode <= 39)) {
                // let it happen, don't do anything
                return;
            }
            else if (event.keyCode == 86 && event.ctrlKey || event.shiftKey && event.keyCode == 45 ||
            	event.ctrlKey && event.keyCode == 45 || event.ctrlKey && event.keyCode == 67) {
                // Ctrl+V, Shift+Inst, Ctrl+Inst, Ctrl+C
                return;
            } else {
                // Ensure that it is a number and stop the keypress
                if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)) {
                    event.preventDefault();
                }
            }
        }).change(function (e) {
            console.log("change");
            // paste from context menu
            var inputValue = $(this).val();
            var parsedValue = toInt(inputValue);
            if (isNaN(parsedValue) || inputValue != parsedValue) {
                value("");                
                return;
            }
            value($(this).val());
        }).keyup(function () {
            console.log("keyup");
            if (!options) {                
                value($(this).val());                
                return;
            }

            var inputValue = $(this).val();
            
            if (options.max && inputValue > options.max) {
                inputValue = options.max;
                value(inputValue);                
            }           
        }).blur(function() {
            console.log("blur");
            if (!options) {
                value($(this).val());
                return;
            }
            
            var inputValue = $(this).val();
            
            if ((options.min || options.min == 0) && inputValue <= options.min) {
                inputValue = options.min;
                value(inputValue);                
            }
        });
	}
	
	function update(element, valueAccessor, allBindings) {
        console.log("update");
        var bindingValue = valueAccessor() || {};  
        var value =  bindingValue.value;    
        var valueUnwrapped = ko.unwrap(value);
        var options = bindingValue.numericOptions || {};         
        var $element = $(element);
        
        var parsedValue = toInt(valueUnwrapped);
        if (isNaN(parsedValue) || valueUnwrapped != parsedValue) {
            parsedValue="";
            value("");
            return;
        }

        if(options){
            options.min = options.min ? toInt(options.min) : 0;
            
            if(options.max){
                options.max = toInt(options.max);

                if(options.max < options.min){
                    throw new Error("Max option should be more or equal than Min option");
                }
            }           
        }

        if(options && options.max && parsedValue > options.max){
            parsedValue = options.max;
            value(parsedValue);
            $element.val(parsedValue);
            return;
        }
        
        // code from http://stackoverflow.com/questions/26263169/how-to-retain-cursor-position-when-updating-a-knockout-js-observable-in-an-exten
        if($element.is(":focus")){
	        var caretPosition = getCaretPosition($element[0]);
	        console.log(caretPosition);            
            $element.val(parsedValue);
	        setCaretPosition($element[0], caretPosition);
	    }else{
	    	$element.val(parsedValue);
	    }
    }

    function toInt(value){
    	return parseInt(value, 10);
    }

    // Code from http://stackoverflow.com/questions/2897155/get-cursor-position-in-characters-within-a-text-input-field
	function getCaretPosition (element) {
		var caretPosition = 0;

		// IE Support
		if (document.selection) {
			element.focus();
			// To get cursor position, get empty selection range
			var sel = document.selection.createRange();
			// Move selection start to 0 position
			sel.moveStart ('character', -element.value.length);
			// The caret position is selection length
			caretPosition = sel.text.length;
		}

		// other browsers support
		else if (element.selectionStart || element.selectionStart == '0'){
			caretPosition = element.selectionStart;
		}

		return (caretPosition);
	}

	// Code from http://stackoverflow.com/questions/512528/set-cursor-position-in-html-textbox
	function setCaretPosition(element, caretPosition) {
		if(!element){
			return;
		}
		if(element.createTextRange) {
			var range = element.createTextRange();
			range.move('character', caretPosition);
			range.select();
		}
		else {
			if(element.selectionStart) {
				element.focus();
				element.setSelectionRange(caretPosition, caretPosition);
			}
			else{
				element.focus();
			}
		}
	}
	
    return {
        init: init,
        update: update
    };	
	
}(ko);