import React from 'react';
import Select from 'react-select';

const CustomDropdown = ({ id, name, options, value, onChange, styles, placeholder = "Select an option" }) => {
  const handleSelectChange = (selectedOption) => {
    console.log(`Dropdown changed: ${name} with value:`, selectedOption ? selectedOption.value : "None"); // Debugging
    onChange(selectedOption);
  };

  return (
    <Select
      id={id}
      name={name}
      options={options}
      value={value}
      onChange={handleSelectChange}
      styles={styles}
      placeholder={placeholder} // Pass placeholder to Select
    />
  );
};

export default CustomDropdown;
