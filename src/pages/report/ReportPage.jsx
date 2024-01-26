import { useQuery } from "@tanstack/react-query"
import { ReportTemplate } from "../../components/templates/report/ReportTemplate"
import { useKardexStore } from "../../store/KardexStore"
import { useCompanyStore } from "../../store/CompanyStore"


export const ReportPage = () => {
  const dataCompany = useCompanyStore((state) => state.data)
  const dataKardex = useKardexStore((state) => state.data)
  const getAllKardex = useKardexStore((state) => state.getAll)

  useQuery({
    queryKey: ['getAllKardex', dataCompany?.id],
    queryFn: () => getAllKardex({
      p_id_company: dataCompany.id
    }),
    enabled: dataCompany?.id != null
  })


  return (
    <div>
      <ReportTemplate data={dataKardex}/>
    </div>
  )
}
