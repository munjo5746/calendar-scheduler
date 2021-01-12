import React from 'react';

import * as dateFns from 'date-fns';

import './CalendarScheduler.scss';

const Calendar: React.FC = () => {
    const week: Date[] = [...Array.from(Array(7).keys())].map((idx) => {
        return dateFns.add(new Date(), { days: idx });
    });

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
                {<div className="time-column">{/* time slots */}</div>}
                {week.map((d, idx) => (
                    <div className="time-column">{idx}</div>
                ))}
            </div>
        </div>
    );
};

export default Calendar;
