import { useCategoryStore } from "../../../../store/CategoryStore"
import { TemplateBaseSectionSearch } from "../../_base/TemplateBaseSectionSearch"

export const Search = () => {
    const setStrSearch = useCategoryStore((state) => state.setStrSearch)

    return (
        <TemplateBaseSectionSearch setStrSearch={setStrSearch} />
    )
}
