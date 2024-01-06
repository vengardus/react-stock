import Swal from "sweetalert2";
import { SupabaseCrud } from "./supabase.crud";
import { consoleError } from "../utils/messages";

export class CategoryModel extends SupabaseCrud {
    constructor() {
        super("inv_categories");
    }

    async getAll(p) {
        const data = await this.getByField("id_company", p.id_company);
        return data;
    }

    async insert(p) {
        const { error } = await this.supabase.rpc("insert_category", p);
        if (error) {
            this.error = true;
            this.message = error.message;
            Swal.fire({
                //position: "top-end",
                icon: "error",
                title: "Oops",
                text: `Error al insertar categoría: ${error.message}`,
                //showConfirmButton: false,
                //timer: 1700,
            });
        }

        return error ? false : true;
    }

    async filter(p) {
        const { data, error } = await this.supabase
            .from(this.TABLE_NAME)
            .select()
            .eq("id_company", p.id_company)
            .ilike("description", "%" + p.description + "%");

        this.error = error != null;
        if (this.error) {
            this.message = error.message;
            consoleError(
                `${BrandModel.name}.${this.filter.name}.${this.TABLE_NAME}: ${error.message}`
            );
        }

        return data;
    }
}
