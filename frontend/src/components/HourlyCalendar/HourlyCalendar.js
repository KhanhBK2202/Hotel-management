

import { addDays, differenceInDays, parseISO } from 'date-fns'
import { useEffect, useState } from 'react';
import { Calendar } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

import classNames from 'classnames/bind';
import styles from './HourlyCalendar.module.scss';
import { actions, useStore } from '~/store';

const cx = classNames.bind(styles)

function HourlyCalendar({ onChange }) {
    const [date, setDate] = useState();

    const [state, dispatch] = useStore()

    // const dateConverter = (startDate, timeEnd) => {
    //     const newStartDate= new Date(startDate);
    //     const newEndDate=new Date(timeEnd);
    //     const one_day = 1000*60*60*24;
    //     let result
    //     result = Math.ceil((newEndDate.getTime()-newStartDate.getTime())/(one_day))
    //     if (result < 0 ) {return 0}
    //     return result
    // }
    
    useEffect(() => {
        onChange(date)
        // dispatch(actions.setStorageDate([date, date]))
        // dispatch(actions.setStorageNumOfDays(0))
    },[date]);

    // useEffect(() => {
    //     const calendar = document.querySelector('.' + cx('shrink'))
    //     if (!state.toggle)
    //         calendar.style.scale = '0.85'
    //     else 
    //         calendar.style.scale = '1'
    // },[state.toggle])

    return (
        <div className={cx('calendar')}>
            <Calendar
                // editableDateInputs={true}
                onChange={item => setDate(item)}
                // moveRangeOnFirstSelection={false}
                // ranges={date}
                minDate={addDays(new Date(), 0)}
                color={'var(--primary)'}
                className={cx('shrink')}
                date={date}
            />
        </div>
    );
}

export default HourlyCalendar;