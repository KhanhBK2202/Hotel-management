import config from '~/config'

// Layout
// import { HeaderOnly } from '~/layouts';

import Home from '~/pages/Home';
import DetailType from '~/pages/DetailType';
import DetailBranch from '~/pages/DetailBranch';
import Checkout from '~/pages/Checkout';
import Signin from '~/pages/Signin';
import Signup from '~/pages/Signup';
import Profile from '~/pages/Profile';

// Public Routes: dùng để ko đăng nhập vẫn có thể vào được những trang này
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.detailType, component: DetailType },
    { path: config.routes.detailBranch, component: DetailBranch },
    { path: config.routes.checkout, component: Checkout, layout: null },
    { path: config.routes.signin, component: Signin, layout: null },
    { path: config.routes.signup, component: Signup, layout: null },
    { path: config.routes.profile, component: Profile,layout: null },
    // { path: config.routes.upload, component: Home, layout: HeaderOnly },
    // { path: config.routes.search, component: Search, layout: null },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
