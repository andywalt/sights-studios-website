import React from 'react';
import Select from 'react-select';

const CustomDropdown = ({ options, handleChange, styles }) => {
  return (
    <Select
      options={options}
      onChange={handleChange}
      styles={styles}  // Apply external styles passed as props
    />
  );
};

export default CustomDropdown;