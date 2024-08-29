import React from 'react';
import Select from 'react-select';

const CustomDropdown = ({ id, name, options, value, onChange, styles }) => {
  const handleSelectChange = (selectedOption) => {
    console.log(`Dropdown changed: ${name} with value:`, selectedOption.value); // Debugging
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
    />
  );
};

export default CustomDropdown;
