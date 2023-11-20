import React, { useEffect, useState } from 'react';
import { Select } from '../../pico-components/Select';

function GroupSelector({ groupId, page, disabled, onChange }) {
  const [selectedGroupId, setSelectedGroupId] = useState(null);

  useEffect(() => {
    if (groupId && page?.groups) {
      const found = page.groups.find(g => g.sortKey === groupId);
      setSelectedGroupId(found ? groupId : null);
    }
  }, [groupId, page]);

  if (!page?.groups?.length) {
    return null;
  }

  return (
    <Select
      label="Group"
      options={page.groups}
      value={selectedGroupId}
      onChange={value => {
        setSelectedGroupId(value);
        onChange(value);
      }}
      valueKey="sortKey"
      renderItem={group => group.title}
      disabled={disabled}
    />
  );
}

export default GroupSelector;
