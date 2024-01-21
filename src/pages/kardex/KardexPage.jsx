import { useQuery } from "@tanstack/react-query"
import { useCompanyStore } from "../../store/CompanyStore"
import { Error } from "../../components/moleculas/Error"
import { SpinnerLoader } from "../../components/moleculas/SpinnerLoader"
import { KardexTemplate } from "../../components/templates/kardex/KardexTemplate"
import { useKardexStore } from "../../store/KardexStore"
import { useProductStore } from "../../store/ProductStore"


export const KardexPage = () => {
    const company = useCompanyStore((state) => state.data)
    const dataKardex = useKardexStore((state) => state.data)
    const getAllKardex = useKardexStore((state) => state.getAll)
    const filterKardex = useKardexStore((state) => state.filter)
    const strSearchKardex = useKardexStore((state) => state.strSearch)

    const getAllProduct = useProductStore((state) => state.getAll)
    const filterProduct = useProductStore((state) => state.filter)
    const strSearchProduct = useProductStore((state) => state.strSearch)

    //const filter = useUserStore((state) => state.filter)
    //const strSearch = useUserStore((state) => state.strSearch)
    //const getAllModule = useModuleStore((state) => state.getAll)

    const queryUser = useQuery({
        queryKey: ['getAllKardex', company?.id],
        queryFn: () => getAllKardex({
            p_id_company: company?.id
        }),
        enabled: company?.id != null
    })

    useQuery({
        queryKey: ['getAllProduct', company?.id],
        queryFn: () => getAllProduct({
            p_id_company: company?.id
        }),
        enabled: company?.id != null
    })

    useQuery({
        queryKey: ['filterProducts', company?.id, strSearchProduct],
        queryFn: () => filterProduct({
            id_company: company?.id,
            description: strSearchProduct
        }),
        enabled: company?.id != null
    })

    useQuery({
        queryKey: ['filterKardex', company?.id, strSearchKardex],
        queryFn: () => filterKardex({
            p_id_company: company.id,
            p_str_search: strSearchKardex
        }),
        enabled: company?.id != null
    })
  
    if (queryUser.isLoading) return <SpinnerLoader />
    if (queryUser.isError) return <Error />

    return (
        <KardexTemplate data={dataKardex} />
    )
}
