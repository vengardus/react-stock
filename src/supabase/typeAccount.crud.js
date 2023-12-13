import { SupabaseCrud } from "./supabase.crud";

export class TypeAccountModel extends SupabaseCrud {
    constructor() {
        super("type_account");
    }
}
