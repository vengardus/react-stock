import { consoleError } from "../utils/messages";
import { supabase } from "./supabase.config";
import { SupabaseCrud } from "./supabase.crud";

export class AccountModel extends SupabaseCrud {
    constructor() {
        super("accounts");
    }

    async getAllGroupByType(p)  {
        try {
          const { data, error } = await supabase.rpc("getaccountsgroupbytype", {
            p_id_user: Number(p.id_user),
          });
          if (error) console.log("error rpc", error);
          console.log("rpc data", data, p);
          return data;
        } catch (error) {
            consoleError(
                `${AccountModel.name}.${this.getAllGroupByType.name}.${this.TABLE_NAME}: ${error.message}`
            );
        }
      }
    
}
