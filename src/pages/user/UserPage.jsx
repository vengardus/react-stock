import { useQuery } from "@tanstack/react-query"
import { UserTemplate } from "../../components/templates/user/UserTemplate"
import { useUserStore } from "../../store/UserStore"
import { useCompanyStore } from "../../store/CompanyStore"
import { SpinnerLoader } from "../../components/moleculas/SpinnerLoader"
import { Error } from "../../components/moleculas/Error"
import { useModuleStore } from "../../store/ModuleStore"

export const UserPage = () => {
  const company = useCompanyStore((state) => state.data)
  const dataUser = useUserStore((state)=>state.dataAll)
  const getAll = useUserStore((state) => state.getAll)
  const filter = useUserStore((state) => state.filter)
  const strSearch = useUserStore((state) => state.strSearch)
  const getAllModule = useModuleStore((state) => state.getAll)

  const queryUser = useQuery({
    queryKey: ['getAllUsers', company?.id],
    queryFn: () => getAll({ 
      p_id_company: company?.id 
    }),
    enabled: company?.id != null
  })

  useQuery({
      queryKey: ['filterUsers', company?.id, strSearch],
    queryFn: () =>filter({
      p_id_company: company.id,
      p_str_search: strSearch
    }),
    enabled: company?.id != null
  })

  useQuery({
    queryKey: ['getAllModules'],
    queryFn: () => getAllModule()
  })

  if (queryUser.isLoading) return <SpinnerLoader />
  if (queryUser.isError) return <Error />

  return (
    <UserTemplate users={dataUser} />
  )
}
