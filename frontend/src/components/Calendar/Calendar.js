
// import classNames from 'classnames/bind';
// import React from 'react';
// import { useEffect, useState } from 'react';
// import styles from './Calendar.module.scss';

// const cx = classNames.bind(styles)

// function Calendar({ getDate, diff }) {

//     const [getDay, setGetDay] = useState()
//     const [getMonth, setGetMonth] = useState(new Date().getMonth() + 1)
//     const [getYear, setGetYear] = useState(new Date().getFullYear())
//     useEffect(() => {
//         let calendar = document.querySelector('.' + cx('calendar'))
    
//         const month_names = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    
//         const isLeapYear = (year) => {
//             return (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) || (year % 100 === 0 && year % 400 === 0)
//         }
    
//         const getFebDays = (year) => {
//             return isLeapYear(year) ? 29 : 28
//         }
    
//         const generateCalendar = (month, year) => {
            
//             let calendar_days = calendar.querySelector('.' + cx('calendar-days'))

//             let calendar_header_year = calendar.querySelector('#year')
    
//             let days_of_month = [31, getFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    
//             calendar_days.innerHTML = ''
    
//             let currDate = new Date()
//             if (month == null) month = currDate.getMonth()
//             if (!year) year = currDate.getFullYear()
    
//             let curr_month = `${month_names[month]}`
//             month_picker.innerHTML = curr_month
//             calendar_header_year.innerHTML = year
    
//             // get first day of month
            
//             let first_day = new Date(year, month, 1)
    
//             for (let i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++) {
//                 let day = document.createElement('div')
//                 if (i >= first_day.getDay()) {
//                     day.classList.add(cx('calendar-day-hover'))
//                     day.innerHTML = i - first_day.getDay() + 1
//                     day.innerHTML += `<span></span>
//                                     <span></span>
//                                     <span></span>
//                                     <span></span>`
//                     if (i - first_day.getDay() + 1 === currDate.getDate() && year === currDate.getFullYear() && month === currDate.getMonth()) {
//                         day.classList.add(cx('curr-date'))
//                     }
//                 }
//                 day.onclick = function () { // get the day on click
//                     const isChoosen = document.querySelector('.' + cx('choosen'))
//                     if (isChoosen) isChoosen.classList.remove(cx('choosen'))
//                     day.classList.add(cx('choosen'))
//                     setGetDay(i - first_day.getDay() + 1)
//                 }
//                 calendar_days.append(day)
//             }
//         }
    
//         let month_list = calendar.querySelector('.' + cx('month-list'))
    
//         month_names.forEach((e, index) => {
//             let month = document.createElement('div')
//             month.innerHTML = `<div data-month="${index}">${e}</div>`
//             month.querySelector('div').onclick = () => {
//                 month_list.classList.remove(cx('show'))
//                 curr_month.value = index
//                 setGetMonth(curr_month.value + 1) // get month 
//                 generateCalendar(index, curr_year.value)
//             }
//             month_list.append(month)
//         })
    
//         let month_picker = calendar.querySelector('#month-picker')
    
//         month_picker.onclick = () => {
//             month_list.classList.add(cx('show'))
//         }
    
//         let currDate = new Date()
    
//         let curr_month = {value: currDate.getMonth()}
//         let curr_year = {value: currDate.getFullYear()}
    
//         generateCalendar(curr_month.value, curr_year.value)
    
//         document.querySelector('#prev-year').onclick = () => {
//             --curr_year.value
//             setGetYear(curr_year.value) // get year 
//             generateCalendar(curr_month.value, curr_year.value)
//         }
    
//         document.querySelector('#next-year').onclick = () => {
//             ++curr_year.value
//             setGetYear(curr_year.value) // get year 
//             generateCalendar(curr_month.value, curr_year.value)
//         }
//         // let dark_mode_toggle = document.querySelector('.' + cx('dark-mode-switch'))
    
//         // dark_mode_toggle.onclick = () => {
//         //     document.querySelector('.' + cx('light')).classList.toggle(cx('light'))
//         //     document.querySelector('.' + cx('light')).classList.toggle(cx('dark'))
//         // }
        
//     },[])

//     useEffect(() => {
//         if (getDay) getDate([getDay, getMonth, getYear])
//     },[getDay, getMonth, getYear])
    
//     return (
//         // <div className={cx('light')}>
//             <div className={cx('calendar')}>
//                 <div className={cx('calendar-inner')}>
//                     <div className={cx('calendar-header')}>
//                         <span className={cx('month-picker')} id="month-picker">February</span>
//                         <div className={cx('year-picker')}>
//                             <span className={cx('year-change')} id="prev-year">
//                                 &lt;
//                             </span>
//                             <span id="year">2021</span>
//                             <span className={cx('year-change')} id="next-year">
//                                 &gt;
//                             </span>
//                         </div>
//                     </div>
//                     <div className={cx('calendar-body')}>
//                         <div className={cx('calendar-week-day')}>
//                             <div>Sun</div>
//                             <div>Mon</div>
//                             <div>Tue</div>
//                             <div>Wed</div>
//                             <div>Thu</div>
//                             <div>Fri</div>
//                             <div>Sat</div>
//                         </div>
//                         <div className={cx('calendar-days')}></div>
//                     </div>
//                     {/* <div className={cx('calendar-footer')}>
//                         <div className={cx('toggle')}>
//                             <span>Dark Mode</span>
//                             <div className={cx('dark-mode-switch')}>
//                                 <div className={cx('dark-mode-switch-ident')}></div>
//                             </div>
//                         </div>
//                     </div> */}
//                     <div className={cx('month-list')}></div>
//                 </div>
//             </div>
//     );
// }

// export default Calendar;

import { addDays, differenceInDays, parseISO } from 'date-fns'
import { useEffect, useState } from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

import classNames from 'classnames/bind';
import styles from './Calendar.module.scss';
import { actions, useStore } from '~/store';

const cx = classNames.bind(styles)

function Calendar() {
    const [date, setDate] = useState([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 1),
            key: 'selection'
        }
    ]);

    const [state, dispatch] = useStore()

    const dateConverter = (startDate, timeEnd) => {
        const newStartDate= new Date(startDate);
        const newEndDate=new Date(timeEnd);
        const one_day = 1000*60*60*24;
        let result
        result = Math.ceil((newEndDate.getTime()-newStartDate.getTime())/(one_day))
        if (result < 0 ) {return 0}
        return result
    }
    
    useEffect(() => {
        dispatch(actions.setStorageDate([date[0].startDate, date[0].endDate]))
        dispatch(actions.setStorageNumOfDays(dateConverter(date[0].startDate, date[0].endDate)))
    },[date, dispatch]);

    useEffect(() => {
        const calendar = document.querySelector('.' + cx('shrink'))
        if (!state.toggle)
            calendar.style.scale = '0.85'
        else 
            calendar.style.scale = '1'
    },[state.toggle])

    return (
        <div className={cx('calendar')}>
            <DateRange
                editableDateInputs={true}
                onChange={item => setDate([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={date}
                minDate={addDays(new Date(), 0)}
                rangeColors={['var(--primary)']}
                className={cx('shrink')}
            />
        </div>
    );
}

export default Calendar;