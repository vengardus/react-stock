import { useState } from "react"
import { Container } from "../utils/tabs.style"
import { v } from "../../../../styles/variables"
import { KardexTable } from "./KardexTable"
import { useActionRegister } from "../../_base/utils/useActionRegister"

export const KardexTabs = ({ data }) => {
    const [activeTab, setActiveTab] = useState(0)
    const {actionRegister} = useActionRegister(data)

    const handleClick = (index) => {
        setActiveTab(index)
    }

    return (
        <Container $activeTab={`${activeTab}00%`}>
            <ul className="tabs">
                <li className={activeTab === 0 ? "active" : ""}
                    onClick={() => handleClick(0)}
                >
                    {<v.iconopie />}
                    Kardex
                </li>

                <li className={activeTab === 1 ? "active" : ""}
                    onClick={() => handleClick(1)}
                >
                    {<v.iconopie />}
                    Otros
                </li>
                <span className="glider"></span>
            </ul>

            <div className="tab-content mb-2 px-2">
                {activeTab === 0 &&
                    <KardexTable
                        data={data ?? []}
                        actionRegister={actionRegister}
                    />
                }
                {activeTab === 1 && <span>Información otros</span>}
            </div>
        </Container>
    )
}

