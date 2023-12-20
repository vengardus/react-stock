import { consoleError } from "../utils/messages";
import { supabase } from "./supabase.config";
import { SupabaseCrud } from "./supabase.crud";

export class CompanyModel extends SupabaseCrud {
    constructor() {
        super("inv_companies");
    }

    async getAllByUser(p) {
        const { data, error } = await supabase
            .from("inv_user_company")
            .select(`inv_companies(id, name, currency_symbol)`)
            .eq("id_user", p.id_user)
            .maybeSingle()

        this.error = error != null;
        if (this.error) {
            this.message = error.message;
            consoleError(
                `${CompanyModel.name}.${this.getAll.name}.${this.TABLE_NAME}: ${error.message}`
            );
        }

        return data;
    }
}
