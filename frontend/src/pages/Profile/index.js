import { Link, useParams, useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate, faBriefcase, faCircleCheck, faGraduationCap, faXmark } from '@fortawesome/free-solid-svg-icons';

import styles from './Profile.module.scss'
import Sidebar from '../../layouts/components/Sidebar'
import { faFacebookF, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import Image from '~/components/Image';

const cx = classNames.bind(styles)

function Profile() {
    
    return (
        <div className={cx('wrapper')}>
            <div className={cx('left')}>
                <div className={cx('avatar')}>
                    <Image className={cx('avatar-img')} src='' alt=''/>
                </div>
                <h1 className={cx('avatar-name')}>
                    khanhmtn
                    <FontAwesomeIcon icon={faCircleCheck} className={cx('avatar-admin')}/>
                </h1>
                <h3 className={cx('job')}>student</h3>
                <button className={cx('follow')}>Follow</button>

                <div className={cx('total')}>
                    <div className={cx('total-post')}>
                        <h1 className={cx('total-number')}>
                            4
                        </h1>
                        Posts
                    </div>

                    <div className={cx('total-post')}>
                        <h1 className={cx('total-number')}>
                            6
                        </h1>
                        Followers
                    </div>

                    <div className={cx('total-post')}>
                        <h1 className={cx('total-number')}>
                            3
                        </h1>
                        Following
                    </div>
                </div>
                <Sidebar />
            </div>

            <div className={cx('right')}>
                <div className={cx('cover')}>
                    <Image className={cx('cover-img')} src='' alt=''/>
                </div>

                <div className={cx('right-inner')}>
                    <div className={cx('right-inner__left')}>
                        <div className={cx('refresh-icon')}>
                            <FontAwesomeIcon icon={faArrowsRotate}/>
                        </div>
                        <div className={cx('right-col-inner', 'tab-p', 'active-pane')}>
                            <div className={cx('section')}>
                                <div className={cx('myArticles', 'active-section')}>
                                    My Articles
                                </div>
                                <div className={cx('myArticles')}>
                                    Favorited Articles
                                </div>
                                <div className={cx('createArticles')}>
                                    <Link to="/create/post">
                                        Create new article
                                    </Link>
                                </div>
                                <div className={cx('line')}></div>
                            </div>

                            <div className={cx('posts', 'active-pane-section')}>
                                a
                            </div>

                            <div className={cx('posts')}>
                                b   
                            </div>
                        </div>

                        <div className={cx('right-col-inner', 'tab-p')}>
                            <div className={cx('post')}>
                                <h1 className={cx('post-title')}>Contact information</h1>
                                <br/>

                                <div className={cx('member')}>
                                    <h2 className={cx('member-title')}>Phone:</h2>
                                    <span className={cx('member-info')}>0888380625</span>
                                </div>
                                <div className={cx('member')}>
                                    <h2 className={cx('member-title')}>Email:</h2>
                                    <span className={cx('member-info')}>nhatkhanhbk2202@gmail.com</span>
                                </div>
                                <div className={cx('member')}>
                                    <h2 className={cx('member-title')}>Address:</h2>
                                    <span className={cx('member-info')}>9B/8B Phan Boi Chau phuong 3 thanh pho My Tho, tinh Tien Giang</span>
                                </div>
                                <div className={cx('member')}>
                                    <h2 className={cx('member-title')}>D.O.B:</h2>
                                    <span className={cx('member-info')}>22/02/2000</span>
                                </div>
                            </div>       
                        </div>

                        <div className={cx('right-col-inner', 'tab-p')}>
                            <div className={cx('post')}>
                                <h1 className={cx('post-title')}>Favorite</h1>
                                <br/>
                                c
                            </div>
                        </div>
                        
                    </div>

                    <div className={cx('right-inner__right')}>
                        <div className={cx('user-intro')}>
                            <h2 className={cx('user-intro__heading')}>Settings</h2>
                            <p className={cx('user-intro__bio')}>This user is very nice but don't leave any trace!</p>
                        </div>

                        <div className={cx('user-skill')}>
                            <h2 className={cx('user-intro__heading')}>SKILLS</h2>
                            <ul className={cx('tag')}>
                                    <li className={cx('tag-name')}>d</li>
                            </ul>
                        </div>

                        <ul className={cx('user-social')}>
                            <li className={cx('user-social-icon')}>
                                <Link to='facebook.com' target="_blank" rel="noreferrer">
                                    <FontAwesomeIcon icon={faFacebookF} className={cx('social-icon')}/>
                                </Link>
                            </li>
                            <li className={cx('user-social-icon')}>
                                <Link to='instagram.com' target="_blank" rel="noreferrer">
                                    <FontAwesomeIcon icon={faInstagram} className={cx('social-icon')}/>
                                </Link>
                            </li>
                            <li className={cx('user-social-icon')}>
                                <Link to='twitter.com' target="_blank" rel="noreferrer">
                                    <FontAwesomeIcon icon={faTwitter} className={cx('social-icon')}/>
                                </Link>
                            </li>
                        </ul>

                        {/* <h1 className={cx('time')}>{clockState}</h1> */}
                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default Profile;
