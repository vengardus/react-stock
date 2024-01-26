import { KardexReport } from "../../organismos/report/KardexReport"
import { TemplateBaseHeader } from "../_base/TemplateBaseHeader"
import {PDFViewer} from "@react-pdf/renderer"

export const ReportTemplate = ({data}) => {

    return (
        <div className="containerTemplate">
            <TemplateBaseHeader />

            <section id="section1" className="">
                Reports
            </section>

            <section id="section2" className="h-screen bg-red-400">
                <PDFViewer width={'100%'} height={'100%'}>
                    <KardexReport data={data}/>
                </PDFViewer>
            </section>

            <section className="">
                Hola
            </section> 
        </div>
    )
}

