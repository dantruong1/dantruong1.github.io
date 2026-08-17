import React, { useMemo } from 'react';
import { useApartmentHover } from './ApartmentContext';

export function RoomGroup({
  room,
  x,
  y,
  width,
  height,
  floorColor,
  isSelected,
  onSelectRoom,
  children,
}) {
  const { hoveredProductId } = useApartmentHover();

  const sortedChildren = useMemo(() => {
    const childArray = React.Children.toArray(children);
    if (!hoveredProductId) return childArray;

    const hoveredIndex = childArray.findIndex(
      (child) => React.isValidElement(child) && child.props?.product?.id === hoveredProductId
    );

    if (hoveredIndex === -1) return childArray;

    const hoveredChild = childArray[hoveredIndex];
    const otherChildren = childArray.filter((_, idx) => idx !== hoveredIndex);
    return [...otherChildren, hoveredChild];
  }, [children, hoveredProductId]);

  return (
    <g
      transform={`translate(${x}, ${y})`}
      className="cursor-pointer group select-none"
      onClick={() => onSelectRoom && onSelectRoom(room.id)}
    >
      {/* Room Floor Surface */}
      <rect
        width={width}
        height={height}
        rx={18}
        className={`${floorColor} transition-colors duration-500 shadow-inner`}
      />

      {/* Room Wall Borders */}
      <rect
        width={width}
        height={height}
        rx={18}
        fill="none"
        stroke="currentColor"
        strokeWidth={isSelected ? 3 : 1.5}
        className={`${
          isSelected
            ? 'text-matcha dark:text-matcha-glow stroke-dasharray-[6]'
            : 'text-espresso/15 dark:text-night-border group-hover:text-matcha/60'
        } transition-colors duration-300`}
      />

      {/* Room Header Badge Tag */}
      <foreignObject x={14} y={14} width={width - 28} height={36} className="pointer-events-none overflow-visible">
        <div className="flex items-center">
          <div className={`px-3 py-1 rounded-full text-[11px] font-mono font-bold flex items-center gap-1.5 shadow-xs border transition-all ${
            isSelected
              ? 'bg-matcha text-white border-matcha dark:bg-matcha-dark'
              : 'bg-card/90 dark:bg-night-card/90 text-espresso dark:text-night-text border-espresso/10 dark:border-night-border group-hover:border-matcha/50'
          }`}>
            <span>{room.icon}</span>
            <span>{room.name}</span>
          </div>
        </div>
      </foreignObject>

      {/* Room Furniture & Objects */}
      <g transform="translate(0, 0)">{sortedChildren}</g>
    </g>
  );
}

