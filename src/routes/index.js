import { routes } from "../config/routes"

import Home from "../pages/home"
// import User from "../pages/user"
import Message from "../pages/Messasge"
import Login from "../pages/Login"
// import { SignUp } from '../pages/Login/SignUp'
// import UserWall from "../pages/UserWall/index.js"
import { Search } from "../pages/Search/index.js"
import { GroupWall } from "../pages/GroupWall/index.js"
import { NullLayout } from "../layouts/NullLayout/index.js"
import UserWall from "../pages/UserWall/index copy"
import { AuthenticationEmail } from "../pages/Login/SignUp/AuthenticationGmail/index.js"
import Test from "../pages/Test/index.js"
const publicRoutes = [
    { path: routes.home, component: Home },
    { path: routes.test, component: Test, layout: NullLayout },
    { path: routes.message, component: Message },
    { path: routes.login, component: Login, layout: NullLayout },
    { path: routes.authenticationEmail, component: AuthenticationEmail, layout: NullLayout },
    // { path: routes.signUp, component: SignUp },
    { path: routes.userWall, component: UserWall },
    { path: routes.search, component: Search },
    { path: routes.groupWall, component: GroupWall }
]

const privateRoutes = [

]

export { publicRoutes, privateRoutes }