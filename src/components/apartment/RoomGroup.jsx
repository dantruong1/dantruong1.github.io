import React from 'react';
import { motion } from 'framer-motion';

export function RoomGroup({
  room,
  x,
  y,
  width,
  height,
  floorColor,
  wallColor,
  isSelected,
  onSelectRoom,
  children,
}) {
  return (
    <g
      transform={`translate(${x}, ${y})`}
      className="cursor-pointer group"
      onClick={() => onSelectRoom && onSelectRoom(room.id)}
    >
      {/* Room Floor Surface */}
      <rect
        width={width}
        height={height}
        rx={16}
        className={`${floorColor} transition-colors duration-500 shadow-inner`}
      />

      {/* Room Wall Borders */}
      <rect
        width={width}
        height={height}
        rx={16}
        fill="none"
        stroke="currentColor"
        strokeWidth={isSelected ? 3 : 1.5}
        className={`${
          isSelected
            ? 'text-matcha dark:text-matcha-glow stroke-dasharray-[6]'
            : 'text-espresso/15 dark:text-night-border group-hover:text-matcha/60'
        } transition-colors duration-300`}
      />

      {/* Room Name Badge Header */}
      <g transform="translate(14, 18)">
        <rect
          width={room.name.length * 9 + 34}
          height={24}
          rx={12}
          className="fill-card/90 dark:fill-night-card/90 stroke-espresso/10 dark:stroke-night-border shadow-xs"
        />
        <text
          x={10}
          y={16}
          className="fill-espresso dark:fill-night-text text-[11px] font-mono font-bold select-none pointer-events-none"
        >
          {room.icon} {room.name}
        </text>
      </g>

      {/* Room Content (Furniture, Objects, Plants) */}
      <g transform="translate(0, 0)">{children}</g>
    </g>
  );
}
