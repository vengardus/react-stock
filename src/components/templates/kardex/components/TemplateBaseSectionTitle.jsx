import { APP_CONFIG } from "../../../../utils/dataEstatica"
import { ContentFilter } from "../../../atomos/ContentFilter"
import { BtnSave } from "../../../moleculas/BtnSave"


export const TemplateBaseSectionTitle = ({
    title,
    actionRegister
}) => {
    return (
        <section id="sectionTitle" className="">
            <ContentFilter >
                <div className="title">{title}</div>
                <BtnSave
                    title={'+ Entrada'}
                    bgcolor={'#52de65'}
                    func={()=>actionRegister({movementType:APP_CONFIG.movementType.incoming})}
                />
                <BtnSave
                    title={'- Salida'}
                    bgcolor={'#fb6661'}
                    func={()=>actionRegister({movementType:APP_CONFIG.movementType.outgoing})}
                />
            </ContentFilter>
        </section>
    )
}
