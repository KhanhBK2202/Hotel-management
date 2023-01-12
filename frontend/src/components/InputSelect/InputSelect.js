
import { faCalendar, faLocation } from '@fortawesome/free-regular-svg-icons';
import { faAngleDown, faLocationArrow } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import styles from './InputSelect.module.scss';
// import flatpickr from 'flatpickr'
// import rangePlugin from 'flatpickr/dist/plugins/rangePlugin'

const cx = classNames.bind(styles)

// const config = {
//     enableTime: true, 
//     dateFormat: 'Y-m-d H:i',
//     altInput: true,
//     altFormat: 'F j, Y (h:S K)'
// }
// flatpickr('input[type=datetime-local]', config)

// flatpickr('#myID', {
//     "plugins": [new rangePlugin({ input: "#secondRangeInput"})]
// });

function InputSelect({ data, order, icon, placeholder, option }) {

    // const [value, setValue] = useState();

    // useEffect(() => {
        
    // }
    // const [searchItem, setSearchItem] = useState();
    const handleChange = (e) => {
        // setSearchItem(e.target.value)
        option(e.target.value, order)
        // console.log(e.target.value)
        // setValue(e.target.value);
        // if (value === 'Hourly') {
        //     console.log('Hourly!!!')
        // }
        // else console.log('Overnight!!!')
    };

    // useEffect(() => {
    //     option(searchItem, order)
    // },[searchItem, order])

    return (
        <>
            {/* <div className={cx('wrapper')}>
                <FontAwesomeIcon icon={faLocationArrow} className={cx('icon')}/>
                <select className={cx('title')} placeholder={placeholder}>
                    <option value='Hourly'>Hourly</option>
                    <option value='Overnight'>Overnight</option>
                </select>
                <FontAwesomeIcon icon={faAngleDown} className={cx('icon')}/>
            </div> */}
            {/* <form className={cx('form')} action="/gas" method="get"> */}
            <div className={cx('wrapper')}>
                <select className={cx('form-select')} defaultValue={placeholder} onChange={handleChange} >
                    <option value={placeholder} disabled>
                        {placeholder}
                    </option>
                    
                    {data.map((item, index) => (
                        <option key={index} value={item.name ? item.name : item}>{item.name ? item.name : item}</option>
                    ))}
                </select>
            </div>
            {/* </form> */}
            {/* <div className={cx('wrapper')}>
                <FontAwesomeIcon icon={faLocationArrow} className={cx('icon')}/>
                <input className={cx('title')} id='myID' placeholder={placeholder}/>
                <FontAwesomeIcon icon={faAngleDown} className={cx('icon')}/>
            </div> */}
        </>
    );
}

export default InputSelect;