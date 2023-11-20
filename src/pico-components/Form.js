import React from 'react';

export function TextArea({ label, onChange, disabled }) {
  return (
    <>
      {!!label && <label>{label}</label>}
      <textarea disabled={disabled} onChange={e => onChange(e.target.value)} />
    </>
  );
}

export function Select({ label, options, value, onChange, disabled, valueKey, renderItem }) {
  return (
    <>
      {!!label && <label>{label}</label>}
      <select value={value} onChange={e => onChange(e.target.value)} disabled={disabled}>
        {options.map((option, index) => (
          <option key={option[valueKey]} value={option[valueKey]}>
            {renderItem(option, index)}
          </option>
        ))}
      </select>
    </>
  );
}
