import { Select, Text } from 'grommet';
import React, { useEffect, useState } from 'react';

function GroupSelector({ groupId, page, disabled, onChange }) {
  const [value, setValue] = useState(null);

  useEffect(() => {
    if (groupId && page?.groups) {
      const found = page.groups.find(g => g.sortKey === groupId);
      setValue(found);
    }
  }, [groupId, page]);

  if (!page?.groups?.length) {
    return null;
  }

  return (
    <>
      <Text weight="bold">Group</Text>
      <Select
        options={page.groups}
        value={value}
        onChange={({ option }) => {
          setValue(option);
          onChange(option.sortKey);
        }}
        labelKey="title"
        valueKey="sortKey"
        placeholder="Select group"
        disabled={disabled}
      />
    </>
  );
}

export default GroupSelector;
