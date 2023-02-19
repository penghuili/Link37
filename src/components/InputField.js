import { Text, TextInput } from 'grommet';
import React from 'react';

function InputField({ label, placeholder, value, onChange }) {
  return (
    <>
      <Text weight="bold">{label}</Text>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChange={event => onChange(event.target.value)}
      />
    </>
  );
}

export default InputField;
