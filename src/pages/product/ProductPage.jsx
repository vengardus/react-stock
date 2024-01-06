import { useQuery } from "@tanstack/react-query"
import { ProductTemplate } from "../../components/templates/product/ProductTemplate"
import { useProductStore } from "../../store/ProductStore"
import { useCompanyStore } from "../../store/CompanyStore"
import { SpinnerLoader } from "../../components/moleculas/SpinnerLoader"
import { Error } from "../../components/moleculas/Error"
import { useBrandStore } from "../../store/BrandStore"
import { useCategoryStore } from "../../store/CategoryStore"

export const ProductPage = () => {
  const company = useCompanyStore((state) => state.data)
  const dataProduct = useProductStore((state) => state.data)
  const getAll = useProductStore((state) => state.getAll)
  const filter = useProductStore((state) => state.filter)
  const strSearch = useProductStore((state) => state.strSearch)
  const getAllBrand = useBrandStore((state) => state.getAll)
  const getAllCategory = useCategoryStore((state) => state.getAll)

  const queryProduct = useQuery({
    queryKey: ['getAllProducts', company?.id],
    queryFn: () => getAll({
      p_id_company: company.id
    }),
    enabled: company?.id != null
  })

  useQuery({
    queryKey: ['filterProducts', company?.id, strSearch],
    queryFn: () => filter({
      id_company: company.id,
      description: strSearch
    }),
    enabled: company?.id != null
  })

  useQuery({
    queryKey: ['getAllBrand', company?.id],
    queryFn: () => getAllBrand({
      id_company: company.id
    }),
    enabled: company?.id != null
  })
  
  useQuery({
    queryKey: ['getAllCategory', company?.id],
    queryFn: () => getAllCategory({
      id_company: company.id
    }),
    enabled: company?.id != null
  })

  if (queryProduct.isLoading) return <SpinnerLoader />
  if (queryProduct.isError) return <Error />

  return (
    <ProductTemplate products={dataProduct} />
  )
}
