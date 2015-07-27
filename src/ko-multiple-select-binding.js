// Custom binding for multiple select jQuery plugin
// http://wenzhixin.net.cn/p/multiple-select/docs/
// https://github.com/wenzhixin/multiple-select
//
// @author Sufflavus https://github.com/Sufflavus
// @version 1.1.0 

ko.bindingHandlers.multipleSelect = function(ko) {

	function init(element, valueAccessor, allBindings, viewModel, bindingContext) {			
		var $element = $(element);	
		var bindingValue = valueAccessor() || {};			
		var multipleSelectConfig = bindingValue.multipleSelectConfig || {};	
		
		var initialEvents = {
			onClick: multipleSelectConfig.onClick,
			onCheckAll: multipleSelectConfig.onCheckAll,
			onUncheckAll: multipleSelectConfig.onUncheckAll
		};
		
		multipleSelectConfig.onClick = function(){ 
			updateSelectedValuesBinding();	 

			if(initialEvents.onClick){
				initialEvents.onClick();
			}			
		};

		multipleSelectConfig.onCheckAll = function(){ 
			updateSelectedValuesBinding();	

			if(initialEvents.onCheckAll){
				initialEvents.onCheckAll();
			}			 
		};
	 
		multipleSelectConfig.onUncheckAll = function(){ 
			updateSelectedValuesBinding();	
			
			if(initialEvents.onUncheckAll){
				initialEvents.onUncheckAll();
			}			 
		};

		$element.multipleSelect(multipleSelectConfig);
		
		if(bindingValue.selectedValues){			
			var valueUnwrapped = ko.unwrap(bindingValue.selectedValues);
			$element.multipleSelect("setSelects", valueUnwrapped);
		}	

		function updateSelectedValuesBinding(){
			var selectedItems = $element.multipleSelect("getSelects");			
			bindingValue.selectedValues(selectedItems);		
		}
	}
	
	function update(element, valueAccessor, allBindings) {
        var value = valueAccessor();
        var valueUnwrapped = ko.unwrap(value);
        if (valueUnwrapped.selectedValues) {
            var selectedValues = ko.unwrap(valueUnwrapped.selectedValues);
            if (selectedValues) {
                $(element).multipleSelect("setSelects", selectedValues);
            }
        }
    }
	
    return {
        init: init,
        update: update
    };	
	
}(ko);