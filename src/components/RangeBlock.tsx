import React from 'react';

interface RangeBlockProps {
    startRef: React.RefObject<HTMLDivElement | null>;
    endRef: React.RefObject<HTMLDivElement | null>;
    start: number;
    end: number;
}

export const RangeBlock: React.FC<RangeBlockProps> = ({ startRef, endRef, start, end }) => (
    <div className="historic-dates__range range">
        <p className="range_start" ref={startRef}>{start}</p>
        <p className="range_end" ref={endRef}>{end}</p>
    </div>
);
