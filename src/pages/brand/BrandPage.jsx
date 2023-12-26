import { useQuery } from "@tanstack/react-query"
import { BrandTemplate } from "../../components/templates/brand/BrandTemplate"
import { useBrandStore } from "../../store/BrandStore"
import { useCompanyStore } from "../../store/CompanyStore"
import { SpinnerLoader } from "../../components/moleculas/SpinnerLoader"
import { Error } from "../../components/moleculas/Error"

export const BrandPage = () => {
  const company = useCompanyStore((state) => state.data)
  const getAll = useBrandStore((state) => state.getAll)
  // const filter = useBrandStore((state) => state.filter)
  // const strSearch = useBrandStore((state) => state.strSearch)

  const queryBrand = useQuery({
    queryKey: ['getAllBrands', company?.id],
    queryFn: () => getAll({ 
      id_company: company.id 
    }),
    enabled: company?.id != null
  })

  // const queryFilter = useQuery({
  //   queryKey: ['filterBrands'],
  //   queryFn: () =>filter({
  //     id_company: company.id,
  //     description: strSearch
  //   })
  // })

  if (queryBrand.isLoading) return <SpinnerLoader />
  if (queryBrand.isError) return <Error />

  return (
    <BrandTemplate brands={queryBrand.data} />
  )
}
