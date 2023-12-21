import { useUserStore } from '../store/UserStore'
import { useCompanyStore } from '../store/CompanyStore'
import { useQuery } from '@tanstack/react-query'

export const useInitLoadQuery = () => {
    const userGet = useUserStore((state) => state.get)
    const companyGetByUser = useCompanyStore((state) => state.getByUser)

    const {data:dataUser, isLoading, error}=  useQuery({
        queryKey:['userGet'],
        queryFn: userGet
    })

    useQuery({
        queryKey: ['getAllByUser'],
        queryFn: () => companyGetByUser({
            id_user: dataUser.id
        }),
        enabled:!!dataUser
    })

    return {dataUser, isLoading, error}
}
