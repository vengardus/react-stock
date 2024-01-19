import { useState } from "react";
import { APP_CONFIG } from "../../../../utils/dataEstatica";


export const useActionRegister = () => {
    const [dataSelect, setDataSelect] = useState([]);
    const [action, setAction] = useState(APP_CONFIG.actionCrud.insert);
    const [openRegister, setOpenRegister] = useState(false);

    const actionRegister = (action=APP_CONFIG.actionCrud.insert, data=[]) => {
        setAction(action);
        setDataSelect(data);
        setOpenRegister(!openRegister);
    };

    return { action, dataSelect, openRegister, actionRegister, setOpenRegister };
};
