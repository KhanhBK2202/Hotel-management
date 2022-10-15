import config from '~/config'

// Layout
// import { HeaderOnly } from '~/layouts';

import Home from '~/pages/Home';
import Detail from '~/pages/Detail';

// Public Routes: dùng để ko đăng nhập vẫn có thể vào được những trang này
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.detail, component: Detail },
    // { path: config.routes.upload, component: Home, layout: HeaderOnly },
    // { path: config.routes.search, component: Search, layout: null },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
