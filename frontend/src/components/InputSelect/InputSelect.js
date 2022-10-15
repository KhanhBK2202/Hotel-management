
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './InputSelect.module.scss';

const cx = classNames.bind(styles)

function InputSelect({ icon, placeholder }) {
    return (
        <div className={cx('wrapper')}>
            <FontAwesomeIcon icon={faCalendar} className={cx('icon')}/>
            <span className={cx('title')}>{placeholder}</span>
            <FontAwesomeIcon icon={faAngleDown} className={cx('icon')}/>
        </div>
    );
}

export default InputSelect;