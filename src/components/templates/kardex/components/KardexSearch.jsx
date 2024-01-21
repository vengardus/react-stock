import { useKardexStore } from "../../../../store/KardexStore"
import { TemplateBaseSectionSearch } from "../../_base/TemplateBaseSectionSearch"

export const KardexSearch = () => {
    const setStrSearch = useKardexStore((state) => state.setStrSearch)

    return (
        <TemplateBaseSectionSearch setStrSearch={setStrSearch} />
    )
}
