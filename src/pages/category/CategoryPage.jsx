import { useQuery } from "@tanstack/react-query"
import { SpinnerLoader } from "../../components/moleculas/SpinnerLoader"
import { useCategoryStore } from "../../store/CategoryStore"
import { useCompanyStore } from "../../store/CompanyStore"
import { CategoryTemplate } from "../../components/templates/category/CategoryTemplate"
import { Error } from "../../components/moleculas/Error"


export const CategoryPage = () => {
  const company = useCompanyStore((state) => state.data)
  const dataCategory = useCategoryStore((state)=>state.data)
  const getAll = useCategoryStore((state) => state.getAll)
  const filter = useCategoryStore((state) => state.filter)
  const strSearch = useCategoryStore((state) => state.strSearch)

  const queryCategory = useQuery({
    queryKey: ['getAllCategories', company?.id],
    queryFn: () => getAll({ 
      id_company: company.id 
    }),
    enabled: company?.id != null
  })

  useQuery({
      queryKey: ['filterCategories', company?.id, strSearch],
    queryFn: () =>filter({
      id_company: company.id,
      description: strSearch
    })
  })

  if (queryCategory.isLoading) return <SpinnerLoader />
  if (queryCategory.isError) return <Error />

  return (
    <CategoryTemplate categories={dataCategory} />
  )
}
