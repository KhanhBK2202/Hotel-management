
import { Calendar } from 'react-date-range';
import { addDays } from 'date-fns'
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

import classNames from 'classnames/bind';
import styles from './DatePicker.module.scss';

const cx = classNames.bind(styles)

function DatePicker({ getDate }) {
    const handleSelect = (date) =>{
        getDate(date);
    }
    return (
        <div className={cx('calendar')}>
            <Calendar
                onChange={handleSelect}
                minDate={addDays(new Date(), 0)}
                color='var(--primary)'
            />
        </div>
    );
}

export default DatePicker;