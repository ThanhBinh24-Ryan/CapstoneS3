import React, { useState, useEffect } from 'react';

export default function RenderRap({ raps }) {
  // If there are no raps available, show a message
  if (!raps || raps.length === 0) {
    return <div>No raps available</div>;
  }

  return (
    <div
      id="default-carousel"
      className="relative w-full h-full overflow-hidden mt-5"
      data-carousel="slide"
    >
      <div className="relative h-56 md:h-96">
        {/* Flexbox to align the raps vertically and transition between them */}
        <div
          className="flex flex-col transition-transform duration-700 ease-in-out"
        >
          {raps.map((rap, index) => (
            <div key={index} className="flex-shrink-0">
              <img src={rap.logo} alt={`rap-${index}`} className="w-28 object-cover pt-3 pl-3" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
