import {
  closestCenter,
  DndContext,
  MouseSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove, rectSortingStrategy, SortableContext, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import React, { useMemo, useState } from 'react';
import { useListener } from '../shared/react/hooks/useListener';

function SortableItem({ link }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: link.sortKey,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {link.title}
    </div>
  );
}

function DragDrop({ items, onDragEnd }) {
  const [innerItems, setInnerItems] = useState(items || []);
  useListener(items, value => setInnerItems(value));
  const ids = useMemo(() => innerItems.map(i => i.sortKey), [innerItems]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    })
  );

  function handleDragEnd(event) {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = ids.indexOf(active.id);
      const newIndex = ids.indexOf(over.id);

      const newItems = arrayMove(innerItems, oldIndex, newIndex);
      setInnerItems(newItems);

      onDragEnd(active.id, over.id);
    }
  }

  if (!items?.length) {
    return null;
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={ids} id="sortKey" strategy={rectSortingStrategy}>
        <div
          style={{
            maxWidth: '800px',
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gridGap: '10px',
          }}
        >
          {innerItems.map(link => (
            <SortableItem key={link.sortKey} link={link} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}

export default DragDrop;
