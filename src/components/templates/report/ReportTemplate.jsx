import { KardexReport } from "../../organismos/report/KardexReport"
import { TemplateBaseHeader } from "../_base/TemplateBaseHeader"
import {PDFViewer} from "@react-pdf/renderer"

export const ReportTemplate = () => {

    return (
        <div className="containerTemplate">
            <TemplateBaseHeader />

            <section id="section1" className="">
                Reports
            </section>

            <section id="section2" className="h-screen">
                <PDFViewer width={'100%'} height={'100%'}>
                    <KardexReport />
                </PDFViewer>
            </section>

            {/* <section className="">
            </section> */}
        </div>
    )
}

