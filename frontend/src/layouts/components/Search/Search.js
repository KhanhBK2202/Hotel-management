import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import InputSelect from '~/components/InputSelect';
import Image from '~/components/Image';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import Calendar from '~/components/Calendar';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faMinus, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import request from '~/utils/request';
import { useSelector } from 'react-redux';
import Clock from '~/components/Clock';
import { actions, useStore} from '~/store';
import DatePicker from '~/components/DatePicker';

const cx = classNames.bind(styles);

function Header() {

    // useEffect(() => {
    //     const inputs = document.querySelectorAll('.' + cx('search-input'))
    //     const calendar = document.querySelectorAll('.' + cx('calendar'))
    //     inputs.forEach((input, index) => {
    //         input.onclick = () => {
    //             if (calendar[index - 1])
    //                 calendar[index - 1].style.display = 'block'
    //         }
    //     })
    // })
    const user = useSelector((state) => state.auth.login.currentUser);
    const [province, setProvince] = useState([])
    useEffect(() => {
        request
            .get('https://provinces.open-api.vn/api/p/')
            .then(res => setProvince(res.data))
            .catch(e => console.log(e))
    }, [])
    let input2 = ['Hourly', 'Overnight']
    let input3 = []
    for (var i = 1; i < 11; i++) {
        input3[i - 1] = i;
    }

    const [option, setOption] = useState()
    const [order, setOrder] = useState()
    // const [flag, setFlag] = useState(1)
    var options = []
    // useEffect(() => {
    //     const inputs = document.querySelectorAll('.' + cx('search-input'))
    //     inputs.forEach((input, index) => {
            
    //     }
    // })
    // const [flag, setFlag] = useState(false)
    useEffect(() => {
        if (option && order) {
            options[order - 1] = option
            setOption1(options[1])
            // localStorage.setItem('option' + order, option);
        }
    }, [options, option, order]);

    const [option1, setOption1] = useState()
    // useEffect(() => {
    //     if (options[1] === 'Hourly') {
    //         const modal = document.querySelectorAll('.' + cx('modal'))
    //         modal[0].classList.remove(cx('disappear'))
    //         modal[0].classList.add(cx('appear'))
    //     }
    //     else if (options[1] === 'Overnight') {
    //         const modal = document.querySelectorAll('.' + cx('modal'))
    //         modal[1].classList.remove(cx('disappear'))
    //         modal[1].classList.add(cx('appear'))
    //     }
    // },[option1]);

    // Choose time for hourly
    var timeInterval = []
    const d = new Date();
    // let hour = d.getHours();
    // let minute = d.getMinutes();
    if (d.getHours() >= 22) {
        console.log('Cannot book for hourly. Please booking for overnight')
    }
    // if (minute < 30) {
    //     let switchFlag = true
    //     if (hour >= 22 && minute > 0) {
    //         console.log('Cannot book for hourly. Please booking for overnight')
    //     }
    //     else {
    //         while (hour <= 22) {
    //             let minuteFlag = switchFlag ? '30' : '00'
    //             timeInterval.push(hour + ':' + minuteFlag)
    //             switchFlag = !switchFlag
    //             hour = switchFlag ? hour : hour + 1
    //             if (switchFlag === true && hour === 22) break
    //         }
    //     }
    // }
    // else {
    //     let switchFlag = true
    //     if (hour > 22 && minute > 0) {
    //         console.log('Cannot book for hourly. Please booking for overnight')
    //     }
    //     else {
    //         while (hour <= 21) {
    //             let minuteFlag = switchFlag ? '00' : '30'
    //             timeInterval.push(hour + 1 + ':' + minuteFlag)
    //             switchFlag = !switchFlag
    //             hour = switchFlag ? hour + 1 : hour
    //             if (switchFlag === false && hour + 1 === 22) break
    //         }
    //     }
    // }

    // const handleChangeTime = (e) => {
    //     localStorage.setItem('option4', e.target.value)
    // }

    const [timeHourly, setTimeHourly] = useState(1)
    const handleTimeIntervalHourly = (e) => {
        setTimeHourly(e.target.value)
    }

    // const handleSubmitHourly = () => {
    //     // localStorage.removeItem('option6', 'option7')
    //     const modal = document.querySelectorAll('.' + cx('modal'))
    //     modal[0].classList.remove(cx('appear'))
    //     modal[0].classList.add(cx('disappear'))
    // }

    // const handleTotalDays = (e) => {
    //     localStorage.setItem('option7', e.target.value)
    // }

    // const handleSubmitOvernight = () => {
    //     // localStorage.removeItem('option4', 'option5')
    //     const modal = document.querySelectorAll('.' + cx('modal'))
    //     // modal[1].style.display = 'none';
    //     modal[1].classList.remove(cx('appear'))
    //     modal[1].classList.add(cx('disappear'))
    // }

    const handleOption = (op, order) => {
        setOption(op)
        setOrder(order)
    }

    // const handleClear = () => {
    //     // options = []
    //     localStorage.clear()
    //     // setFlag(!flag)
    // }

    // useEffect(() => {
    //     window.onload = function() {
    //         localStorage.clear()
    //     }
    // })

    // const month_names = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    // const [fullDate, setFullDate] = useState()
    // const getDateCheckIn = (date) => {
    //     date[1] = month_names[date[1] - 1] 
    //     localStorage.setItem('option6', date[1] + ' ' + date[0] + ', ' + date[2])
    //     // setFullDate(date[1] + ' ' + date[0] + ', ' + date[2])
    // }

    // const getDateCheckOut = (date) => {
    //     date[1] = month_names[date[1] - 1] 
    //     localStorage.setItem('option7', date[1] + ' ' + date[0] + ', ' + date[2])
    //     // setFullDate(date[1] + ' ' + date[0] + ', ' + date[2])
    // }

    const [dateArrive, setDateArrive] = useState()
    const [dateLeave, setDateLeave] = useState()
    // let dateForHourly = new Date()
    const getDate = (date) => {
        setDateArrive(date.toString().slice(4, 15))
        setDateLeave(date.toString().slice(4, 15))
    }

    // const handleClose = () => {
    //     if (options[1] === 'Hourly') {
    //         const modal = document.querySelectorAll('.' + cx('modal'))
    //         modal[0].classList.remove(cx('appear'))
    //         modal[0].classList.add(cx('disappear'))
    //     }
    //     else if (options[1] === 'Overnight') {
    //         const modal = document.querySelectorAll('.' + cx('modal'))
    //         modal[1].classList.remove(cx('appear'))
    //         modal[1].classList.add(cx('disappear'))
    //     }
    // }

    const [state, dispatch] = useStore()

    const [hours, setHour] = useState(d.getHours())
    const [min, setMin] = useState(d.getMinutes())
    const addZero = (i) => {
        if (i < 10) {i = "0" + i}
        return i;
    }
    const getTime = (h, m) => {
        setHour(h)
        setMin(m)
    }
    
    // useEffect(() => {
    //     const timeArrive = hours + ':' + min
    //     let hourLeave = addZero(parseInt(hours) + parseInt(timeHourly))
    //     if (hourLeave > 23)
    //         hourLeave = hourLeave - 24
    //     const timeLeave = hourLeave + ':' + min
    //     dispatch(actions.setStorageTime([timeArrive, timeLeave]))
    // },[dispatch, hours, min, timeHourly]);

    useEffect(() => {
        let timeCheckIn, timeCheckOut
        if (option === 'Hourly') {
            if (hours || min) {
                timeCheckIn = hours + ':' + min
                let hourLeave = addZero(parseInt(hours) + parseInt(timeHourly))
                if (hourLeave > 23)
                    hourLeave = hourLeave - 24
                timeCheckOut = hourLeave + ':' + min
                // console.log(timeCheckIn, timeCheckOut)
                dispatch(actions.setStorageTimeIn(timeCheckIn))
                dispatch(actions.setStorageTimeOut(timeCheckOut))
            }
        }
        else {
            if (order === 2) {
                if (hours || min) {
                    timeCheckIn = hours + ':' + min
                    dispatch(actions.setStorageTimeIn(timeCheckIn))
                }
            }
            else if (order === 3) {
                if (hours || min) {
                    timeCheckOut = hours + ':' + min
                    dispatch(actions.setStorageTimeOut(timeCheckOut))
                }
            }
        }
        
    },[dispatch, hours, min, timeHourly, option, order]);

    useEffect(() => {
        if (options[0])
            dispatch(actions.setStorageHotel(options[0]))
    },[dispatch]);

    const [adultsValue, setAdultsValue] = useState(state.traveller)
    useEffect(() => {
        if (options[1])
            // console.log(options[1])
            dispatch(actions.setStorageTypeTime(options[1]))
        // if (options[2])
            // console.log(typeof options[2])
            dispatch(actions.setStorageTraveller(adultsValue))
    },[dispatch, option, adultsValue]);

    const handleIncreaseAdults = () => {
        const minus = document.querySelector('.' + cx('minus-adults'))
        minus.classList.remove(cx('inactive'))
        setAdultsValue(prev => prev + 1)
    }
    const handleDecreaseAdults = () => {
        const minus = document.querySelector('.' + cx('minus-adults'))
        if (adultsValue === 1)
            minus.classList.add(cx('inactive'))
        else setAdultsValue(prev => prev - 1)
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <h2 className={cx('heading')}>Find hotel to stay</h2>
                {/* {user && 
                    <Link to='/profile'>
                        <div className={cx('user')}>
                            <Image className={cx('avatar')} src='' alt=''/>
                            <h3 className={cx('user-name')}>khanhmtn</h3>
                        </div>
                    </Link>
                } */}
            </div>
            <div className={cx('search')}>
                <div className={cx('search-input')}>
                    <h3 className={cx('search-input-title')}>Location</h3>
                    {province.length !== 0 && <InputSelect data={province} order='1' icon='faLocationArrow' placeholder='Thành phố Hồ Chí Minh' option={handleOption}/>}
                    
                </div>
                {/* <div className={cx('search-input')}>
                    <h3 className={cx('search-input-title')}>Type of time</h3>
                    <InputSelect data={input2} order='2' icon='location' placeholder='Overnight' option={handleOption}/>
                </div> */}
                {/* <div className={cx('search-input')}>
                    <h3 className={cx('search-input-title')}>Check out</h3>
                    <InputSelect icon='location' placeholder='Add date'/>
                </div> */}
                <div className={cx('search-input')}>
                    <h3 className={cx('search-input-title')}>Travelers</h3>
                    {/* <InputSelect data={input3} order='3' icon='location' placeholder='2' option={handleOption}/> */}
                    <div className={cx('counter')}>
                        <FontAwesomeIcon icon={faMinus} className={cx('counter-button', 'minus-adults')} onClick={handleDecreaseAdults}/>
                        <div className={cx('counter-value')}>{adultsValue}</div>
                        <FontAwesomeIcon icon={faPlus} className={cx('counter-button')} onClick={handleIncreaseAdults}/>
                    </div>
                </div>
                {/* <div className={cx('search-input')}>
                    <h3 className={cx('search-input-title')}>Children</h3>
                    <InputSelect data={input3} order='3' icon='location' placeholder='2' option={handleOption}/>
                </div> */}
                {/* <div className={cx('search-input')}>
                    <h3 className={cx('search-input-title')}></h3>
                    <div className={cx('clear-btn')} >Clear</div>
                </div> */}
                <div className={cx('search-input')} style={{ alignItems: 'flex-end', display: 'flex'}}>
                    <h3 className={cx('search-input-title')}></h3>
                    <div className={cx('search-btn')}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} style={{marginRight: '10px'}}/>
                        Search
                    </div>
                </div>
            </div>

            {/* <div className={cx('modal')}>
                <div className={cx('modal__overlay')}></div>
                <div className={cx('modal__body')}>
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                        <h2 className={cx('')}>Choose date arrive</h2>
                        <div className={cx('close-btn')} onClick={handleClose}>
                            <FontAwesomeIcon icon={faXmark}/>
                        </div>
                    </div> */}
                    {/* <div className={cx('close-btn')} onClick={handleClose}>
                        <FontAwesomeIcon icon={faXmark}/>
                    </div>
                    <div className={cx('wrapper-inner')}> */}
                        {/* <select className={cx('form-select')} defaultValue='default' onChange={handleChangeTime}>
                            <option value='default' disabled>
                                Start at
                            </option>

                            {timeInterval.map((item, index) => (
                                <option key={index} value={item}>{item}</option>
                            ))}
                        </select>

                        <select className={cx('form-select')} defaultValue='default' onChange={handleTimeIntervalHourly}>
                            <option value='default' disabled>
                                Hours
                            </option>
                            
                            <option value='1'>1</option>
                            <option value='2'>2</option>
                            <option value='3'>3</option>
                            <option value='4'>4</option>
                            <option value='5'>5</option>
                            <option value='6'>6</option>
                        </select> */}

                    {/* </div> */}
                    {/* <h3 style={{textAlign: 'center', marginTop: '10px'}}>{dateArrive}</h3>
                    <DatePicker getDate={getDate}/>
                    <h2 className={cx('')}>Choose time arrive</h2>
                    <Clock getTime={getTime}/>
                    <h2 className={cx('')}>Choose the length of stay (hour)</h2>
                    <div className={cx('form-wrapper')}>
                        <select className={cx('form-select')} defaultValue='default' onChange={handleTimeIntervalHourly}>
                            <option value='default' disabled>
                                1
                            </option>
                            
                            <option value='1'>1</option>
                            <option value='2'>2</option>
                            <option value='3'>3</option>
                            <option value='4'>4</option>
                            <option value='5'>5</option>
                            <option value='6'>6</option>
                        </select>
                    </div>
                    <div className={cx('hourly-button')} onClick={handleSubmitHourly}>
                        Confirm
                    </div>

                </div>
            </div> */}

            {/* <div className={cx('modal')}>
                <div className={cx('modal__overlay')}></div>
                <div className={cx('modal__body')}>
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                        <h2 className={cx('')}>Check in &amp; Check out</h2>
                        <div className={cx('close-btn')} onClick={handleClose}>
                            <FontAwesomeIcon icon={faXmark} />
                        </div>
                    </div> */}
                    {/* <div className={cx('wrapper-inner')}> */}
                        {/* <div className={cx('calendar-check-in')}> */}
                            
                            {/* <Calendar className={cx('')}/>
                            <h2 className={cx('')}>Choose time arrive</h2>
                            <Clock getTime={getTime}/>
                            <h2 className={cx('')}>Choose time leave</h2> */}
                            {/* <Clock getTime={getTime}/> */}
                        {/* </div> */}
                        {/* <div className={cx('calendar-check-out')}>
                            <h2 className={cx('')}>Check out</h2>
                            <Calendar className={cx('calendar')} getDate={getDateCheckOut} diff={1}/>
                        </div> */}

                        {/* <select className={cx('form-select')} defaultValue='default' onChange={handleTotalDays}>
                            <option value='default' disabled>
                                Days
                            </option>
                            
                            <option value='1'>1</option>
                            <option value='2'>2</option>
                            <option value='3'>3</option>
                            <option value='4'>4</option>
                            <option value='5'>5</option>
                            <option value='6'>6</option>
                        </select> */}

                    {/* </div> */}
                    {/* <div className={cx('hourly-button')} onClick={handleSubmitOvernight}>
                        Confirm
                    </div>

                </div>
            </div> */}
        </div>
    );
}

export default Header;
