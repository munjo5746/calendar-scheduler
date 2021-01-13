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

    const [selectedDay, setSelectedDay] = React.useState<Date>();
    const [selectedHour, setSelectedHour] = React.useState<{
        hour: number;
        section: 'first' | 'second';
    }>();

    const dateFormat = 'EEEEEE, MMM d';

    return (
        <div className="calendar-scheduler">
            <div className="header grid">
                {<div className="day">{/* for time slots */}</div>}
                {week.map((d) => (
                    <div className="day">{dateFns.format(d, dateFormat)}</div>
                ))}
            </div>

            <div className="body grid">
                {
                    <div className="time-column">
                        {/* time slots */}
                        {timeSlots.map((slot) => (
                            <div className="timeslot header">{`${
                                slot.hour <= 12 ? slot.hour : slot.hour % 12
                            } ${slot.hour < 12 ? 'am' : 'pm'}`}</div>
                        ))}
                    </div>
                }
                {week.map((d) => (
                    <div className="time-column">
                        {timeSlots.map((timeslot) => (
                            <div className="timeslot selection">
                                {(['first', 'second'] as (
                                    | 'first'
                                    | 'second'
                                )[]).map((section) => {
                                    return (
                                        <div
                                            key={`half-section-${section}`}
                                            className={`half ${section} ${
                                                !!selectedDay &&
                                                dateFns.format(
                                                    d,
                                                    dateFormat,
                                                ) ===
                                                    dateFns.format(
                                                        selectedDay,
                                                        dateFormat,
                                                    ) &&
                                                timeslot.hour ===
                                                    selectedHour?.hour &&
                                                section === selectedHour.section
                                                    ? 'selected'
                                                    : `${d.valueOf()}-${selectedDay?.valueOf()}`
                                            }`}
                                            onClick={(e) => {
                                                e.preventDefault();

                                                setSelectedDay(d);
                                                setSelectedHour({
                                                    hour: timeslot.hour,
                                                    section: section,
                                                });
                                            }}
                                        ></div>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Calendar;
