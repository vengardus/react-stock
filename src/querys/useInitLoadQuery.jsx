import { useUserStore } from '../store/UserStore'
import { useCompanyStore } from '../store/CompanyStore'
import { useQuery } from '@tanstack/react-query'

export const useInitLoadQuery = () => {
    const userGet = useUserStore((state) => state.get)
    const companyGetAllByUser = useCompanyStore((state) => state.getAllByUser)

    const {data:dataUser, isLoading, error}=  useQuery({
        queryKey:['userGet'],
        queryFn: userGet
    })

    useQuery({
        queryKey: ['getAllByUser'],
        queryFn: () => companyGetAllByUser({
            id_user: dataUser.id
        }),
        enabled:!!dataUser
    })

    return {dataUser, isLoading, error}
}
