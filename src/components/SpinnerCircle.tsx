import React from 'react';

export interface HistoricEvent {
    date: string | number;
    description: string;
}

export interface HistoricDate {
    title: string;
    events: HistoricEvent[];
}


interface SpinnerCircleProps {
    refEl: React.RefObject<HTMLDivElement | null>;
    angle: number;
    timeOfRotation: number;
    currentIndex: number;
    items: HistoricDate[];
    onSelect: (index: number) => void;
}

export const SpinnerCircle: React.FC<SpinnerCircleProps> = ({
                                                                refEl, angle, timeOfRotation, currentIndex, items, onSelect,
                                                            }) => {
    const numberOfEvents = items.length;

    return (
        <div
            ref={refEl}
            className='spinner__main-circle'
            style={{
                "--count": numberOfEvents,
                "--angle": `${angle}deg`,
                "--time": `${timeOfRotation}ms`,
                "--delay": `${timeOfRotation + 300}ms`,
            } as React.CSSProperties}
        >
            {items.map(({ title }, index) => (
                <div
                    key={index}
                    className={`spinner__shoulder ${currentIndex === index ? 'spinner__shoulder_active' : ''}`}
                    style={{ "--i": index + 1 } as React.CSSProperties}
                    onClick={() => onSelect(index)}
                >
                    <div className='spinner__circle-area'>
                        <p className='spinner__circle'>
                            {index + 1}
                            <span className='spinner__title'>{title}</span>
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};
