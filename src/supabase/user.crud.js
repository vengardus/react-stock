import Swal from "sweetalert2";
import { getIdAuthSupabase } from "./auth";
import { SupabaseCrud } from "./supabase.crud";
import { consoleError } from "../utils/messages";

export class UserModel extends SupabaseCrud {
    constructor() {
        super("inv_users");
    }

    async authSignUp(p) {
        const { data, error } = await this.supabase.auth.signUp({
            email: p.email,
            password: p.password
        })
        return {data, error}
    }

    async authSignOut() {
        await this.supabase.auth.signOut();
    }


    async get() {
        const idAuthSupabase = await getIdAuthSupabase();
        const data = await super.getByField("id_auth", idAuthSupabase);

        return data ? data[0] : null;
    }

    async insert(p) {
        const data = await super.insert(p);
        if (this.error)
            Swal.fire({
                //position: "top-end",
                icon: "error",
                title: "Oops",
                text: `Error al insertar usuario: ${this.message}`,
                showConfirmButton: false,
                timer: 1500,
            });
        return data;
    }

    async update(p) {
        console.log('update.crud', p)
        await super.update(p);
        if (!this.error)
            Swal.fire({
                //position: "top-end",
                icon: "success",
                title: "Datos modificados",
                showConfirmButton: false,
                timer: 1500,
            });
        return !this.error
    }

    async getAll(p) {
        const { data } = await this.supabase.rpc("get_all_users", p);
        return data
    }

    async filter(p) {
        const { data, error } = await this.supabase
            .from(this.TABLE_NAME)
            .select()
            //.eq("id_company", p.id_company)
            .ilike("name", "%" + p.name + "%");

        this.error = error != null;
        if (this.error) {
            this.message = error.message;
            consoleError(
                `${UserModel.name}.${this.filter.name}.${this.TABLE_NAME}: ${error.message}`
            );
        }

        return data
    }

}
