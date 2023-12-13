import Swal from "sweetalert2";
import { getIdAuthSupabase } from "./auth";
import { supabase } from "./supabase.config";
import { consoleError } from "../utils/messages";

const TABLE_NAME = "users";

export class UserModel {
    static get = async () => {
        const idAuthSupabase = await getIdAuthSupabase();

        return UserModel.getByField("idauth_supabase", idAuthSupabase);
    };

    static getByField = async (fieldName, value) => {
        try {
            const { data, error } = await supabase
                .from(TABLE_NAME)
                .select()
                .eq(fieldName, value)
                .maybeSingle();

            if (error)
                consoleError(
                    error.message,
                    `${UserModel.name}.${this.getByField.name}`
                );

            return data;
        } catch (error) {
            consoleError(
                error.error_description || error.message,
                `${UserModel.name}.${this.getByField.name}`
            );
            return null;
        }
    };

    static insert = async (p) => {
        try {
            const { data, error } = await supabase
                .from(TABLE_NAME)
                .insert(p)
                .select();
            if (error)
                consoleError(
                    error.message,
                    `${UserModel.name}.${this.insert.name}`
                );

            return data;
        } catch (error) {
            consoleError(
                error.error_description || error.message,
                `${UserModel.name}.${this.insert.name}`
            );
            return null;
        }
    };

    static update = async (p) => {
        try {
            const { error } = await supabase
                .from(TABLE_NAME)
                .update(p)
                .eq("id", p.id);
            if (error)
                consoleError(
                    error.message,
                    `${UserModel.name}.${this.update.name}`
                );
            else
                Swal.fire({
                    //position: "top-end",
                    icon: "success",
                    title: "Datos modificados",
                    showConfirmButton: false,
                    timer: 1500,
                });
        } catch (error) {
            consoleError(
                error.error_description || error.message,
                `${UserModel.name}.${this.update.name}`
            );
            return null;
        }
    };
}