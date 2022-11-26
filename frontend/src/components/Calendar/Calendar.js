
import classNames from 'classnames/bind';
import { useEffect } from 'react';
import styles from './Calendar.module.scss';

const cx = classNames.bind(styles)

function Calendar() {

    useEffect(() => {
        let calendar = document.querySelector('.' + cx('calendar'))
    
        const month_names = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    
        const isLeapYear = (year) => {
            return (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) || (year % 100 === 0 && year % 400 === 0)
        }
    
        const getFebDays = (year) => {
            return isLeapYear(year) ? 29 : 28
        }
    
        const generateCalendar = (month, year) => {
    
            let calendar_days = calendar.querySelector('.' + cx('calendar-days'))
            let calendar_header_year = calendar.querySelector('#year')
    
            let days_of_month = [31, getFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    
            calendar_days.innerHTML = ''
    
            let currDate = new Date()
            if (!month) month = currDate.getMonth()
            if (!year) year = currDate.getFullYear()
    
            let curr_month = `${month_names[month]}`
            month_picker.innerHTML = curr_month
            calendar_header_year.innerHTML = year
    
            // get first day of month
            
            let first_day = new Date(year, month, 1)
    
            for (let i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++) {
                let day = document.createElement('div')
                if (i >= first_day.getDay()) {
                    day.classList.add(cx('calendar-day-hover'))
                    day.innerHTML = i - first_day.getDay() + 1
                    day.innerHTML += `<span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>`
                    if (i - first_day.getDay() + 1 === currDate.getDate() && year === currDate.getFullYear() && month === currDate.getMonth()) {
                        day.classList.add(cx('curr-date'))
                    }
                }
                calendar_days.appendChild(day)
            }
        }
    
        let month_list = calendar.querySelector('.' + cx('month-list'))
    
        month_names.forEach((e, index) => {
            let month = document.createElement('div')
            month.innerHTML = `<div data-month="${index}">${e}</div>`
            month.querySelector('div').onclick = () => {
                month_list.classList.remove(cx('show'))
                curr_month.value = index
                generateCalendar(index, curr_year.value)
            }
            month_list.appendChild(month)
        })
    
        let month_picker = calendar.querySelector('#month-picker')
    
        month_picker.onclick = () => {
            month_list.classList.add(cx('show'))
        }
    
        let currDate = new Date()
    
        let curr_month = {value: currDate.getMonth()}
        let curr_year = {value: currDate.getFullYear()}
    
        generateCalendar(curr_month.value, curr_year.value)
    
        document.querySelector('#prev-year').onclick = () => {
            --curr_year.value
            generateCalendar(curr_month.value, curr_year.value)
        }
    
        document.querySelector('#next-year').onclick = () => {
            ++curr_year.value
            generateCalendar(curr_month.value, curr_year.value)
        }
    
        // let dark_mode_toggle = document.querySelector('.' + cx('dark-mode-switch'))
    
        // dark_mode_toggle.onclick = () => {
        //     document.querySelector('.' + cx('light')).classList.toggle(cx('light'))
        //     document.querySelector('.' + cx('light')).classList.toggle(cx('dark'))
        // }
    })
    
    return (
        <div className={cx('light')}>
            <div className={cx('calendar')}>
                <div className={cx('calendar-header')}>
                    <span className={cx('month-picker')} id="month-picker">February</span>
                    <div className={cx('year-picker')}>
                        <span className={cx('year-change')} id="prev-year">
                            <pre>&lt;</pre>
                        </span>
                        <span id="year">2021</span>
                        <span className={cx('year-change')} id="next-year">
                            <pre>&gt;</pre>
                        </span>
                    </div>
                </div>
                <div className={cx('calendar-body')}>
                    <div className={cx('calendar-week-day')}>
                        <div>Sun</div>
                        <div>Mon</div>
                        <div>Tue</div>
                        <div>Wed</div>
                        <div>Thu</div>
                        <div>Fri</div>
                        <div>Sat</div>
                    </div>
                    <div className={cx('calendar-days')}></div>
                </div>
                {/* <div className={cx('calendar-footer')}>
                    <div className={cx('toggle')}>
                        <span>Dark Mode</span>
                        <div className={cx('dark-mode-switch')}>
                            <div className={cx('dark-mode-switch-ident')}></div>
                        </div>
                    </div>
                </div> */}
                <div className={cx('month-list')}></div>
            </div>
        </div>
    );
}

export default Calendar;