import { useProductStore } from "../../../../store/ProductStore"
import { TemplateBaseSectionSearch } from "../../_base/TemplateBaseSectionSearch"

export const Search = () => {
    const setStrSearch = useProductStore((state) => state.setStrSearch)

    return (
        <TemplateBaseSectionSearch setStrSearch={setStrSearch} />
    )
}
