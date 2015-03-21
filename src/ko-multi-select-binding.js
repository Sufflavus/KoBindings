// Custom binding for multi-select jQuery plugin
// http://wenzhixin.net.cn/p/multiple-select/docs/
// https://github.com/wenzhixin/multiple-select

ko.bindingHandlers.multiSelect = function(ko) {

	function init(element, valueAccessor, allBindings, viewModel, bindingContext) {			
		var $element = $(element);	
		var bindingValue = valueAccessor() || {};			
		var multiSelectConfig = bindingValue.multiSelectConfig || {};	
		
		var initialEvents = {
			onClick: multiSelectConfig.onClick,
			onCheckAll: multiSelectConfig.onCheckAll,
			onUncheckAll: multiSelectConfig.onUncheckAll
		};
		
		multiSelectConfig.onClick = updateSelectedValuesBinding;	 
		multiSelectConfig.onCheckAll = updateSelectedValuesBinding;		 
		multiSelectConfig.onUncheckAll = updateSelectedValuesBinding;
			
		$element.multipleSelect(multiSelectConfig);
		
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