import { useState } from "react"
import { Header } from "../../organismos/Header"
import { TableCategory } from "../../organismos/table/TableCategory"
import { RegisterCategory } from "../../organismos/form/RegisterCategory"
import { ContentFilter } from "../../atomos/ContentFilter"
import { BtnFilter } from "../../moleculas/BtnFilter"
import { v } from "../../../styles/variables"
import { Searcher } from "../../organismos/Searcher"
import { useCategoryStore } from "../../../store/CategoryStore"

const title = 'Categorías'

export const CategoryTemplate = ({
    categories
}) => {
    const [state, setState] = useState(false)
    const [dataSelect, setDataSelect] = useState([])
    const [action, setAction] = useState("")
    const [openRegister, setOpenRegister] = useState(false)
    const setStrSearch = useCategoryStore((state) => state.setStrSearch)

    const actionRegister = (action, data = []) => {
        setAction(action)
        setDataSelect(data)
        setOpenRegister(!openRegister)
    }

    return (
        <div className="containerTemplate">
            <header className="flex align-middle h-[70px]">
                <Header
                    stateConfig={{
                        state: state,
                        setState: () => setState(!state)
                    }}
                />
            </header>

            <section id="sectionTitle" className="">
                <ContentFilter >
                    <div className="title">{title}</div>
                    <BtnFilter
                        bgColor={'#f6f3f3'}
                        textColor={'#353535'}
                        icon={<v.agregar />}
                        func={(action, data) => actionRegister(action, data)}
                    />
                </ContentFilter>
            </section>

            <section className="sectionSearcher flex justify-end  ">
                <Searcher 
                    setSearcher={setStrSearch}
                />
            </section>

            <section id="sectionTable" className="px-2 flex flex-col gap-y-3">
                <TableCategory
                    data={categories ?? []}
                    actionRegister={(action, data) => actionRegister(action, data)}
                />
            </section>

            <section className="">
                {
                    openRegister && <RegisterCategory
                        dataSelect={dataSelect}
                        action={action}
                        onClose={() => setOpenRegister(!openRegister)}
                    />
                }

            </section>
        </div>
    )
}

