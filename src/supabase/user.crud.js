import Swal from "sweetalert2";
import { getIdAuthSupabase } from "./auth";
import { SupabaseCrud } from "./supabase.crud";

export class UserModel extends SupabaseCrud {
    constructor() {
        super("users");
    }

    async get() {
        const idAuthSupabase = await getIdAuthSupabase();
        const data = await super.getByField("idauth_supabase", idAuthSupabase);

        return data ? data[0] : null;
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
