import config from '~/config'

// Layout
// import { HeaderOnly } from '~/layouts';
import { SidebarOnly } from '~/layouts';

import Home from '~/pages/Home';
import { DefaultLayoutWithSearch } from '~/layouts';
import DetailType from '~/pages/DetailType';
import DetailHotel from '~/pages/DetailHotel';
import DetailBranch from '~/pages/DetailBranch';
import Checkout from '~/pages/Checkout';
import Checkin from '~/pages/Checkin';
import Signin from '~/pages/Signin';
import Signup from '~/pages/Signup';
import Profile from '~/pages/Profile';
import History from '~/pages/History';
import Setting from '~/pages/Setting';
import Dashboard from '~/pages/Dashboard';
import Upload from '~/pages/Upload';
import Earning from '~/pages/Earning';
import Rooms from '~/pages/Rooms';
import RoomTypes from '~/pages/RoomTypes';
import Services from '~/pages/Services';

// Public Routes: dùng để ko đăng nhập vẫn có thể vào được những trang này
const publicRoutes = [
    { path: config.routes.home, component: Home, layout: DefaultLayoutWithSearch },
    { path: config.routes.detailType, component: DetailType },
    { path: config.routes.detailHotel, component: DetailHotel },
    { path: config.routes.detailBranch, component: DetailBranch, layout: DefaultLayoutWithSearch },
    { path: config.routes.checkout, component: Checkout, layout: null },
    { path: config.routes.checkin, component: Checkin, layout: null },
    { path: config.routes.signin, component: Signin, layout: null },
    { path: config.routes.signup, component: Signup, layout: null },
    { path: config.routes.profile, component: Profile},
    { path: config.routes.history, component: History},
    { path: config.routes.setting, component: Setting},
    { path: config.routes.dashboard, component: Dashboard},
    { path: config.routes.upload, component: Upload},
    { path: config.routes.earning, component: Earning},
    { path: config.routes.rooms, component: Rooms},
    { path: config.routes.roomTypes, component: RoomTypes},
    { path: config.routes.services, component: Services},
    // { path: config.routes.upload, component: Home, layout: HeaderOnly },
    // { path: config.routes.search, component: Search, layout: null },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
