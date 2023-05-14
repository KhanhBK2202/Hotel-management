import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import Header from '~/layouts/components/Header'
import Sidebar from '~/layouts/components/Sidebar';
import styles from './DefaultLayout.module.scss'; 
import { useEffect, useState } from 'react';
import Search from '../components/Search';
import { actions, useStore } from '~/store';
import Footer from '../components/Footer';

const cx = classNames.bind(styles)

function DefaultLayout({ children }) {
    
    const [count, setCount] = useState(0)
    const [state, dispatch] = useStore()
    useEffect(() => {
        if (count > 0) {
            const content = document.querySelector('.' + cx('content'))
            content.classList.toggle(cx('toggle'))
        }
        setCount(count + 1)
    }, [state.toggle])
    return (
        <div>
            <div className={cx('container')}>
                <Sidebar/>
                <div className={cx('content')}>
                    <Header />
                    <div className={cx('children')}>
                        {/* <Search /> */}
                        {children}
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    );
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired
}

export default DefaultLayout;
