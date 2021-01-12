import React from 'react';

import * as dateFns from 'date-fns';

import './CalendarScheduler.scss';

const Calendar: React.FC = () => {
    const week: Date[] = [...Array.from(Array(7).keys())].map((idx) => {
        return dateFns.add(new Date(), { days: idx });
    });

    return (
        <div className="calendar-scheduler">
            <div className="header">
                {week.map((d) => (
                    <div className="day">
                        {dateFns.format(d, 'EEEEEE, MMM d')}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Calendar;
