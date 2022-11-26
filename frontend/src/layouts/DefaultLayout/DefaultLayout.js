import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import Header from '~/layouts/components/Header'
import Sidebar from '~/layouts/components/Sidebar';
import styles from './DefaultLayout.module.scss'; 
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles)

function DefaultLayout({ children }) {
    const [checkToggle, setCheckToggle] = useState(true)
    const [count, setCount] = useState(0)
    useEffect(() => {
        if (count > 0) {
            const content = document.querySelector('.' + cx('content'))
            content.classList.toggle(cx('toggle'))
        }
        setCount(count + 1)
    }, [checkToggle])
    const toggle = (flag) => {
        setCheckToggle(flag)
    }
    return (
        <div>
            <div className={cx('container')}>
                <Sidebar toggle={toggle}/>
                <div className={cx('content')}>
                    <Header />
                    {children}
                </div>
            </div>
        </div>
    );
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired
}

export default DefaultLayout;
