import Swal from "sweetalert2";
import { SupabaseCrud } from "./supabase.crud";

export class CategoryModel extends SupabaseCrud {
    constructor() {
        super("categories");
    }


    async update(p) {
        await super.update(p);
        if (!this.error)
            Swal.fire({
                //position: "top-end",
                icon: "success",
                title: "Datos modificados",
                showConfirmButton: false,
                timer: 1500,
            });
    }
}
