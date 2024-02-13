import { useBrandStore } from "../../../../store/BrandStore"
import { TemplateBaseSectionSearch } from "../../_base/TemplateBaseSectionSearch"

export const Search = () => {
    const setStrSearch = useBrandStore((state) => state.setStrSearch)

    return (
        <TemplateBaseSectionSearch setStrSearch={setStrSearch} />
    )
}
