import styled from "styled-components"
import './Account.css'
import { v } from "../../../styles/variables"
import { Table } from "../../organismos/table/Table"
import { HeaderGastos } from "../../organismos/HeaderGastos"

export const AccountsTemplate = ({
    accountData,
    accountGroupByTypeData,
    typeAccountData
}) => {

    return (
        <div className="containerTemplate">
            <header className="flex align-middle h-[70px]">
                <HeaderGastos />
            </header>

            <section id="title" className="flex justify-evenly font-black text-xl">
                <div className="">Cuentas</div>
                <div className="flex items-center rounded-full text-2xl">
                    <div>{<v.agregar/>}</div>
                </div>
            </section>

            <section id="resumen" className="">
                <Table 
                    data={[{
                        'id': 1,
                        'capital': 500.00,
                        'debe': 0.00,
                        'balance': 500.56
                    }]}
                    head={['Capital', 'A deber', 'Balance']}
                    columns={['capital', 'debe','balance']}
                    isActions={false}
                    justify="text-center"
                    isStriped={false}
                    isBgHead={false}
                />
            </section>

            <section className="">
                {
                    accountGroupByTypeData.map(item => (
                        <div key={item.type_id} className="mt-3">
                            <div className="rowTypeAccount px-1">
                                <div className="w-8/12">{item.type_description}</div>
                                <div className="w-4/12 text-right">{item.balance.toFixed(2)}</div>
                            </div>
                            <div className="flex flex-col">
                                {
                                    accountData.filter(account => account.id_type_account == item.type_id).map(x => (
                                        <div key={x.id} className="rowAccount px-1 py-2">
                                            <div className="w-8/12 font-black">{x.description}</div>
                                            <div className="w-4/12 text-right">{x.current_balance.toFixed(2)}</div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    ))
                }
            </section>
        </div>
    )
}

const Container = styled.div`
    min-height: 100vh;
    padding: 15px;
    width: 100%;
    background: ${({ theme }) => theme.bgtotal};
    color: ${({ theme }) => theme.text};
    display: grid;
    grid-template:
        "header" 70px
        "area1" 100px
        "area2" auto
        "main" auto;

    .header {
        grid-area: header;
        background-color: rgba(103, 93, 241, 0.14);
        display: flex;
        align-items: center;
    }
    .area1 {
        grid-area: area1;
        background-color: rgba(229, 67, 26, 0.14);
        display: flex;
        align-items: center;
    }
    .area2 {
        grid-area: area2;
        background-color: rgba(77, 237, 106, 0.14);
        display: flex;
        align-items: center;
    }
    .main {
        grid-area: main;
        background-color: rgba(179, 46, 241, 0.14);
    }
`