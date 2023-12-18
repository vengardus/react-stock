// import styled from "styled-components"
import { useCategoryStore } from "../../store/CategoryStore"
import { useQuery } from "@tanstack/react-query"
import { useTypeAccountStore } from "../../store/TypeAccountStore"
import { Table } from "../organismos/table/Table"
import { HeaderGastos } from "../organismos/HeaderGastos"


export const CategoryTemplate = () => {
    const categoryGetAll = useCategoryStore((state) => state.categoryGetAll)
    const categoryData = useCategoryStore((state) => state.categoryData)
    const typeAccountData = useTypeAccountStore((state) => state.typeAccountData)
    const type = useTypeAccountStore((state) => state.type)

    useQuery({
        queryKey: ['getAll Categories'],
        queryFn: () => categoryGetAll()
    })


    return (
        <div className="containerTemplate">
            <header className="h-[70px] flex align-middle border-b">
                <HeaderGastos />
            </header>
            <section className="">
                <div>Categories with Tailwin: {type}</div>
                {
                    typeAccountData.map(type => (
                        <div key={type.id} className="text-white">{type.description}</div>
                    ))
                }
            </section>
            <section className="">
                <Table
                    data={categoryData}
                    head={['Id', 'Name', 'Type', 'Icon']}
                    columns={['id', 'description', 'type', 'icon']}
                />
            </section>
            <section className="main"></section>
        </div>
    )
}


// const Container = styled.div`
//     min-height: 100vh;
//      width: 100%;
//     background: ${({ theme }) => theme.bgtotal};
//     color: ${({ theme }) => theme.text};
//     display: grid;
//     grid-template:
//         "header" 70px
//         "area1" 70px
//         "area2" auto
//         "main" auto;

//     .header {
//         grid-area: header;
//         /* background-color: rgba(103, 93, 241, 0.14); */
//         display: flex;
//         align-items: center;
//     }
//     .area1 {
//         grid-area: area1;
//         background-color: rgba(229, 67, 26, 0.14);
//         display: flex;
//         /* align-items: center; */
//     }
//     .area2 {
//         grid-area: area2;
//         background-color: rgba(77, 237, 106, 0.14);
//         display: flex;
//         /* align-items: center; */
//     }
//     .main {
//         grid-area: main;
//         background-color: rgba(179, 46, 241, 0.14);
//     }
// `