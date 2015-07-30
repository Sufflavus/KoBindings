// Custom binding for numeric-only values (updates value on keydown)
//
// @author Sufflavus https://github.com/Sufflavus
// @version 1.1.0 

ko.bindingHandlers.numeric = function($, ko) {
    var numbersRegex = /^\d+$/;

    var keyCodes = {
        "backspace": 8,
        "tab": 9,
        "end": 35,
        "right": 39,
        "inst": 45,
        "del": 46,
        "0": 48,
        "9": 57,
        "c": 67,
        "v": 86,
        "num0": 96,
        "num9": 105,
        "f5": 116,
    }

	function init(element, valueAccessor, allBindings, viewModel, bindingContext) {	
        var koValue = valueAccessor() || {};           
        
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
        }).change(function (e) { // paste from context menu                   
            $element = $(this);     
            onInputValueChanged($element, koValue);                          
        }).bind('input propertychange', function() { // paste from context menu          
            $element = $(this);     
            onInputValueChanged($element, koValue);  
        }).bind('paste', function() { // paste from context menu    

        }).keyup(function () {     

        }).blur(function() {            
            $element = $(this);   
            onInputValueChanged($element, koValue);                         
        });
	}

    function onInputValueChanged($element, koValue){
        var inputValue = $element.val();
        if(isNullableNumber(inputValue)){                
            koValue(inputValue);
            koValue.valueHasMutated();                
        } else{
            koValue("");
            $element.val("");
        }    
    }
	
	function update(element, valueAccessor, allBindings) {               
        var koValue = valueAccessor();          
        var valueUnwrapped = ko.unwrap(koValue);          
        var $element = $(element);

        if(!isNullableNumber(valueUnwrapped)){                
            koValue("");
            $element.val("");
            return;
        }    

        // code from http://stackoverflow.com/questions/26263169/how-to-retain-cursor-position-when-updating-a-knockout-js-observable-in-an-exten
        if($element.is(":focus")){
	        var caretPosition = getCaretPosition($element[0]);	                    
            $element.val(valueUnwrapped);
	        setCaretPosition($element[0], caretPosition);
	    }else{
	    	$element.val(valueUnwrapped);
	    }
    }

    function isNullableNumber(value){
        return numbersRegex.test(value) && !!value;
    }

    // Code from http://stackoverflow.com/questions/2897155/get-cursor-position-in-characters-within-a-text-input-field
	function getCaretPosition (element) {
		var caretPosition = 0;

		if (document.selection) { // IE Support
			element.focus();
			// To get cursor position, get empty selection range
			var selectionRange = document.selection.createRange();
			// Move selection start to 0 position
			selectionRange.moveStart ('character', -element.value.length);
			// The caret position is selection length
			caretPosition = selectionRange.text.length;
		} else if (element.selectionStart || element.selectionStart == '0'){ // other browsers support
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
            element.focus();
			if(element.selectionStart) {				
				element.setSelectionRange(caretPosition, caretPosition);
			}			
		}
	}
	
    return {
        init: init,
        update: update
    };	
	
}($, ko);