import { useQuery } from "@tanstack/react-query"
import { useUserStore } from "../../store/UserStore"
import { useCompanyStore } from "../../store/CompanyStore"
import { useModuleStore } from "../../store/ModuleStore"
import { Error } from "../../components/moleculas/Error"
import { SpinnerLoader } from "../../components/moleculas/SpinnerLoader"
import { KardexTemplate } from "../../components/templates/kardex/KardexTemplate"
import { useKardexStore } from "../../store/KardexStore"


export const KardexPage = () => {
    const company = useCompanyStore((state) => state.data)
    const data = useKardexStore((state) => state.data)
    const getAll = useKardexStore((state) => state.getAll)
    //const filter = useUserStore((state) => state.filter)
    //const strSearch = useUserStore((state) => state.strSearch)
    //const getAllModule = useModuleStore((state) => state.getAll)

    const queryUser = useQuery({
        queryKey: ['getAllKardex', company?.id],
        queryFn: () => getAll({
            p_id_company: company?.id
        }),
        enabled: company?.id != null
    })

    // useQuery({
    //     queryKey: ['filterUsers', company?.id, strSearch],
    //     queryFn: () => filter({
    //         p_id_company: company.id,
    //         p_str_search: strSearch
    //     }),
    //     enabled: company?.id != null
    // })

    // useQuery({
    //     queryKey: ['getAllModules'],
    //     queryFn: () => getAllModule()
    // })

    if (queryUser.isLoading) return <SpinnerLoader />
    if (queryUser.isError) return <Error />

    return (
        <KardexTemplate data={data} />
    )
}
