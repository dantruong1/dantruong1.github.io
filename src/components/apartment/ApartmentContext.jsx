import React, { createContext, useContext } from 'react';

export const ApartmentHoverContext = createContext({
  hoveredProductId: null,
  setHoveredProductId: () => {},
});

export function useApartmentHover() {
  return useContext(ApartmentHoverContext);
}
