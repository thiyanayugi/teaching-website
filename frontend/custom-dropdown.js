// Custom dropdown functionality
document.addEventListener('DOMContentLoaded', function() {
    // Convert all select elements to custom dropdowns
    const selects = document.querySelectorAll('.contact select');
    
    selects.forEach(select => {
        createCustomDropdown(select);
    });
});

function createCustomDropdown(selectElement) {
    // Create wrapper
    const wrapper = document.createElement('div');
    wrapper.className = 'custom-select-wrapper';
    
    // Create custom select display
    const customSelect = document.createElement('div');
    customSelect.className = 'custom-select';
    
    // Create selected option display
    const selected = document.createElement('div');
    selected.className = 'custom-select-selected';
    selected.textContent = selectElement.options[0].text;
    
    // Create arrow
    const arrow = document.createElement('div');
    arrow.className = 'custom-select-arrow';
    arrow.innerHTML = '▼';
    
    // Create options list
    const optionsList = document.createElement('div');
    optionsList.className = 'custom-select-options';
    
    // Populate options
    Array.from(selectElement.options).forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'custom-select-option';
        optionDiv.textContent = option.text;
        optionDiv.dataset.value = option.value;
        
        if (index === 0) {
            optionDiv.classList.add('placeholder');
        }
        
        optionDiv.addEventListener('click', function() {
            // Update selected display
            selected.textContent = this.textContent;
            selected.classList.remove('placeholder');
            
            // Update original select
            selectElement.value = this.dataset.value;
            selectElement.dispatchEvent(new Event('change'));
            
            // Remove placeholder class if valid option selected
            if (this.dataset.value) {
                customSelect.classList.remove('invalid');
            }
            
            // Close dropdown
            customSelect.classList.remove('open');
            
            // Update other options
            optionsList.querySelectorAll('.custom-select-option').forEach(opt => {
                opt.classList.remove('selected');
            });
            this.classList.add('selected');
        });
        
        optionsList.appendChild(optionDiv);
    });
    
    // Toggle dropdown
    customSelect.addEventListener('click', function(e) {
        e.stopPropagation();
        
        // Close other dropdowns
        document.querySelectorAll('.custom-select.open').forEach(dropdown => {
            if (dropdown !== customSelect) {
                dropdown.classList.remove('open');
            }
        });
        
        // Toggle this dropdown
        this.classList.toggle('open');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function() {
        customSelect.classList.remove('open');
    });
    
    // Assemble custom dropdown
    customSelect.appendChild(selected);
    customSelect.appendChild(arrow);
    customSelect.appendChild(optionsList);
    wrapper.appendChild(customSelect);
    
    // Hide original select and insert custom dropdown
    selectElement.style.display = 'none';
    selectElement.parentNode.insertBefore(wrapper, selectElement);
    
    // Set initial state
    if (!selectElement.value) {
        customSelect.classList.add('invalid');
        selected.classList.add('placeholder');
    }
}
