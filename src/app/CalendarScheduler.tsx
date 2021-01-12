import React from 'react';

import * as dateFns from 'date-fns';

import './CalendarScheduler.scss';

const Calendar: React.FC = () => {
    const week: Date[] = [...Array.from(Array(7).keys())].map((idx) => {
        return dateFns.add(new Date(), { days: idx });
    });

    const START_TIME = 6;
    const END_TIME = 18;
    const numOfSlots = END_TIME - START_TIME + 1; // +1 is to include the closing time
    const timeSlots = [
        ...Array.from(Array(numOfSlots).keys()),
    ].map((offset) => ({ hour: START_TIME + offset }));

    return (
        <div className="calendar-scheduler">
            <div className="header grid">
                {<div className="day">{/* for time slots */}</div>}
                {week.map((d) => (
                    <div className="day">
                        {dateFns.format(d, 'EEEEEE, MMM d')}
                    </div>
                ))}
            </div>

            <div className="body grid">
                {
                    <div className="time-column">
                        {/* time slots */}
                        {timeSlots.map((slot) => (
                            <div className="timeslot header">{slot.hour}</div>
                        ))}
                    </div>
                }
                {week.map((d, idx) => (
                    <div className="time-column">
                        {timeSlots.map((slot) => (
                            <div className="timeslot"></div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Calendar;
