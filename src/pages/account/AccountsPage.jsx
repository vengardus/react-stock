import { useQuery } from "@tanstack/react-query"
import { AccountsTemplate } from "../../components/templates/account/AccountsTemplate"
import { useAccountStore } from "../../store/AccountStore"
import { useUserStore } from "../../store/UserStore"
import { useTypeAccountStore } from "../../store/TypeAccountStore"

export const AccountsPage = () => {
  const dataUser = useUserStore((state) => state.dataUser)
  const accountGetAll = useAccountStore((state) => state.accountGetAll)
  const accountGetAllGroupByType = useAccountStore((state) => state.accountGetAllGroupByType)
  const accountData = useAccountStore((state) => state.accountData)
  const accountGroupByTypeData = useAccountStore((state) => state.accountGroupByTypeData)
  const typeAccountGetAll = useTypeAccountStore((state) => state.typeAccountGetAll)
  const typeAccountData = useTypeAccountStore((state) => state.typeAccountData)

  
  useQuery({
    queryKey: ['account.getAllGroupByType'],
    queryFn: () => accountGetAllGroupByType({
      id_user: dataUser.id
    })
  })
  
  useQuery({
    queryKey: ['account.getAll'],
    queryFn: () => accountGetAll({
      id_user: dataUser.id
    })
  })
  
  useQuery({
      queryKey: ['typeAccount.getAll'],
      queryFn: () => typeAccountGetAll()
  })

  return (
    <AccountsTemplate 
      accountData={accountData}
      accountGroupByTypeData={accountGroupByTypeData}
      typeAccountData={typeAccountData}
    />
  )
}
