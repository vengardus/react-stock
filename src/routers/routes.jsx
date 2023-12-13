import { Routes, Route } from "react-router-dom"
import { Outlet } from "react-router-dom"
import { Navigate } from "react-router-dom"

import { LoginPage } from "../pages/login/LoginPage"
import { WelcomePage } from "../pages/welcome/WelcomePage"
import { ConfigPage } from "../pages/config/ConfigPage"
import { UserAuth } from "../context/AuthContext"
import { DashboardPage } from "../pages/dashboard/DashboardPage"
import { HomePage } from "../pages/home/HomePage"
import { CategoryPage } from "../pages/category/CategoryPage"
import { AccountsPage } from "../pages/account/AccountsPage"


export function MyRoutes() {
    const { user } = UserAuth()
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<HomePage />} />
            <Route
                element={<ProtectedRoutes
                    user={user}
                    redirectTO="/login" />}
            >
                <Route path="/config" element={<ConfigPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/welcome" element={<WelcomePage />} />
                <Route path="/category" element={<CategoryPage />} />
                <Route path="/accounts" element={<AccountsPage />} />
            </Route>
        </Routes>

    )
}

const ProtectedRoutes = ({ user, redirectTO, children }) => {
    if (user == null) return <Navigate replace to={redirectTO} />
    return children ? children : <Outlet />
}