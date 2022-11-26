import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import InputSelect from '~/components/InputSelect';
import Image from '~/components/Image';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import Calendar from '~/components/Calendar';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

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

    const [option, setOption] = useState()
    const [order, setOrder] = useState()
    // const [flag, setFlag] = useState(1)
    var options = []
    // useEffect(() => {
    //     const inputs = document.querySelectorAll('.' + cx('search-input'))
    //     inputs.forEach((input, index) => {
            
    //     }
    // })
    
    useEffect(() => {
        options[order - 1] = option
        // localStorage.setItem('option' + order, option);
    }, [options, option, order]);

    useEffect(() => {
        // const items = localStorage.getItem('option2');
        console.log(options)
        if (options[1] === 'Hourly') {
            const modal = document.querySelectorAll('.' + cx('modal'))
            modal[0].style.display = 'flex';
        }
        else if (options[1] === 'Overnight') {
            const modal = document.querySelectorAll('.' + cx('modal'))
            modal[1].style.display = 'flex';
        }
    },[options]);
//     for(var i in localStorage)
// {
//     console.log(localStorage[i]);
// }

    // window.document.onload = () => {
    //     localStorage.clear();
    // }

    const handleOption = (op, order) => {
        setOption(op)
        setOrder(order)
    }

    const handleClose = () => {
        if (options[1] === 'Hourly') {
            const modal = document.querySelectorAll('.' + cx('modal'))
            modal[0].style.display = 'none';
        }
        else if (options[1] === 'Overnight') {
            const modal = document.querySelectorAll('.' + cx('modal'))
            modal[1].style.display = 'none';
        }
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <h2 className={cx('heading')}>Find hotel to stay</h2>
                <Link to='/profile'>
                    <div className={cx('user')}>
                        <Image className={cx('avatar')} src='' alt=''/>
                        <h3 className={cx('user-name')}>khanhmtn</h3>
                    </div>
                </Link>
            </div>
            <div className={cx('search')}>
                <div className={cx('search-input')}>
                    <h3 className={cx('search-input-title')}>Location</h3>
                    <InputSelect order='1' icon='faLocationArrow' placeholder='Where are you going?' option={handleOption}/>
                </div>
                <div className={cx('search-input')}>
                    <h3 className={cx('search-input-title')}>Type of time</h3>
                    <InputSelect order='2' icon='location' placeholder='Select type of time' option={handleOption}/>
                </div>
                {/* <div className={cx('search-input')}>
                    <h3 className={cx('search-input-title')}>Check out</h3>
                    <InputSelect icon='location' placeholder='Add date'/>
                </div> */}
                <div className={cx('search-input')}>
                    <h3 className={cx('search-input-title')}>Travelers</h3>
                    <InputSelect order='3' icon='location' placeholder='Add guests' option={handleOption}/>
                </div>
                <div className={cx('search-btn')}>Search</div>
            </div>

            <div className={cx('modal')}>
                <div className={cx('modal__overlay')}></div>
                <div className={cx('modal__body')}>
                    <div className={cx('close-btn')} onClick={handleClose}>
                        <FontAwesomeIcon icon={faXmark}/>
                    </div>
                    <div className={cx('wrapper-inner')}>
                        <select className={cx('form-select')} defaultValue='default' >
                            <option value='default' disabled>
                                Start at
                            </option>
                            
                            <option value='1pm'>1 pm</option>
                            <option value='1.30pm'>1.30 pm</option>
                            <option value='2pm'>2 pm</option>
                            <option value='2.30pm'>2.30 pm</option>
                            <option value='3pm'>3 pm</option>
                            <option value='3.30pm'>3.30 pm</option>
                            <option value='4pm'>4 pm</option>
                            <option value='4.30pm'>4.30 pm</option>
                        </select>

                        <select className={cx('form-select')} defaultValue='default' >
                            <option value='default' disabled>
                                Hours
                            </option>
                            
                            <option value='1'>1</option>
                            <option value='2'>2</option>
                            <option value='3'>3</option>
                            <option value='4'>4</option>
                            <option value='5'>5</option>
                            <option value='6'>6</option>
                        </select>

                    </div>

                </div>
            </div>

            <div className={cx('modal')}>
                <div className={cx('modal__overlay')}></div>
                <div className={cx('modal__body')}>
                    <div className={cx('close-btn')} onClick={handleClose}>
                        <FontAwesomeIcon icon={faXmark}/>
                    </div>
                    <div className={cx('wrapper-inner')}>
                        <select className={cx('form-select')} defaultValue='default' >
                            <option value='default' disabled>
                                Start at
                            </option>
                            
                            <option value='1pm'>1 pm</option>
                            <option value='1.30pm'>1.30 pm</option>
                            <option value='2pm'>2 pm</option>
                            <option value='2.30pm'>2.30 pm</option>
                            <option value='3pm'>3 pm</option>
                            <option value='3.30pm'>3.30 pm</option>
                            <option value='4pm'>4 pm</option>
                            <option value='4.30pm'>4.30 pm</option>
                        </select>

                        <select className={cx('form-select')} defaultValue='default' >
                            <option value='default' disabled>
                                Days
                            </option>
                            
                            <option value='1'>1</option>
                            <option value='2'>2</option>
                            <option value='3'>3</option>
                            <option value='4'>4</option>
                            <option value='5'>5</option>
                            <option value='6'>6</option>
                        </select>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Header;
