import React from 'react';
import { Popover } from '@blueprintjs/core';
import * as dateFns from 'date-fns';

import AppointmentForm from './AppointmentForm';

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

    const [showFormModal, toggleDisplayFormModal] = React.useState<boolean>(
        false,
    );

    return (
        <div className="calendar-scheduler">
            <div className="header grid">
                {<div className="day">{/* for time slot header */}</div>}
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
                                        <Popover
                                            content={<AppointmentForm />}
                                            interactionKind="click"
                                            position="right-top"
                                        >
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
                                                    section ===
                                                        selectedHour.section
                                                        ? 'selected'
                                                        : ``
                                                }`}
                                                onClick={(e) => {
                                                    e.preventDefault();

                                                    setSelectedDay(d);
                                                    setSelectedHour({
                                                        hour: timeslot.hour,
                                                        section: section,
                                                    });

                                                    toggleDisplayFormModal(
                                                        true,
                                                    );
                                                }}
                                            ></div>
                                        </Popover>
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
