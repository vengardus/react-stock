import { Routes, Route } from "react-router-dom"
import { Outlet } from "react-router-dom"
import { Navigate } from "react-router-dom"

import { LoginPage } from "../pages/login/LoginPage"
import { ConfigPage } from "../pages/config/ConfigPage"
import { UserAuth } from "../context/AuthContext"
import { HomePage } from "../pages/home/HomePage"
import { SpinnerLoader } from "../components/moleculas/SpinnerLoader"
import { Error } from "../components/moleculas/Error"
import { useInitLoadQuery } from "../querys/useInitLoadQuery"
import { BrandPage } from "../pages/brand/BrandPage"
import { CategoryPage } from "../pages/category/CategoryPage"
import { ProductPage } from "../pages/product/ProductPage"
import { UserPage } from "../pages/user/UserPage"
import { useUserStore } from "../store/UserStore"
import { PageNotAuth } from "../components/moleculas/PageNotAuth.jsx"
import { KardexPage } from "../pages/kardex/KardexPage.jsx"
import { ReportPage } from "../pages/report/ReportPage.jsx"

const isPermission = (module, permissions) => {
    return permissions.some(permission => permission.inv_modules.name === module)
}

export function MyRoutes() {
    const { user } = UserAuth()
    const { isLoading, error } = useInitLoadQuery()
    const dataPermissionsLoggedInUser = useUserStore((state) => state.dataPermissionsLoggedInUser)

    if (isLoading) return <SpinnerLoader />
    if (error) return <Error />

    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<LoginPage />} />
            <Route
                element={<ProtectedRoutes
                    user={user}
                    redirectTO="/login" />}
            >
                <Route path="/" element={<HomePage />} />
                <Route path="/config" element={<ConfigPage />} />
                <Route path="/config/brand" element={<BrandPage />} />
                <Route path="/config/category" 
                element={
                    isPermission('Categoría de productos', dataPermissionsLoggedInUser)
                        ? <CategoryPage /> : <PageNotAuth />
                } />
                <Route path="/config/product" element={<ProductPage />} />
                <Route path="/config/user"
                    element={
                        isPermission('Personal', dataPermissionsLoggedInUser)
                            ? <UserPage /> : <ConfigPage />
                    } />
                <Route path="/kardex" element={<KardexPage />} />
                <Route path="/report" element={<ReportPage />} />
            </Route>
        </Routes>

    )
}

const ProtectedRoutes = ({ user, redirectTO, children }) => {
    if (user == null) return <Navigate replace to={redirectTO} />
    return children ? children : <Outlet />
}