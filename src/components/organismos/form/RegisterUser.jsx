import { useEffect } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useUserStore } from "../../../store/UserStore";
import { useCompanyStore } from "../../../store/CompanyStore";
import { APP_CONFIG, TypeDocumentData, TypeUserData } from "../../../utils/dataEstatica";
import { InputText } from "./InputText";
import { BtnSave } from "../../moleculas/BtnSave";
import { v } from "../../../styles/variables";
import { convertirCapitalize } from "../../../utils/conversiones";
import { modalAlert } from "../../../utils/modalAlert";
import { ContentSelector } from "../../atomos/ContentSelector";
import { Selector } from "../Selector";
import { ListGeneric } from "../ListGeneric";
import { useState } from "react";
import { Device } from "../../../styles/breakpoints";
import { ListModules } from "../ListModules";
import { useQuery } from "@tanstack/react-query";


export function RegisterUser({
    onClose,
    dataSelect,
    action
}) {
    const [stateTypeDocument, setStateTypeDocument] = useState(false)
    const [typeDocumentSelect, setTypeDocumentSelect] = useState(TypeDocumentData[0])
    const [stateTypeUser, setStateTypeUser] = useState(false)
    const [typeUserSelect, setTypeUserSelect] = useState(TypeUserData[0])

    const insertUser = useUserStore((state) => state.insert)
    const updateUser = useUserStore((state) => state.update)
    const dataCompany = useCompanyStore((state) => state.data)

    const getPermissionsByUser = useUserStore((state) => state.getPermissions)
    const dataPermissions = useUserStore((state) => state.dataPermissions)

    const [checkboxes, setCheckboxes] = useState([])

    const { isLoading } = useQuery({
        queryKey: ['getPermissionByUser', dataSelect?.id ?? 0],
        queryFn: () => getPermissionsByUser({ id_user: dataSelect?.id ?? 0 })
    })

    const {
        register,
        formState: { errors },
        handleSubmit,
        setFocus
    } = useForm();

    const registerUser = async (data) => {
        if (action === APP_CONFIG.actionCrud.update) {
            const p = {
                id: dataSelect.id,
                name: convertirCapitalize(data.name),
                document: data.document,
                address: data.address,
                phone: data.phone,
                type_user: typeUserSelect.description,
                type_document: typeDocumentSelect.description,
                email: data.email
            };

            if (! await updateUser(p, checkboxes))
                modalAlert({
                    type: 'warning',
                    text: `Ocurrió un error. No se actualizó el usuario.`
                })
            onClose();
        } else {
            const pUser = {
                name: convertirCapitalize(data.name),
                document: data.document,
                address: data.address,
                phone: data.phone,
                type_user: typeUserSelect.description,
                type_document: typeDocumentSelect.description,
                email: data.email
            };
            const pAuth = {
                email: data.email,
                password: data.password
            }

            await insertUser(pUser, pAuth, dataCompany.id, checkboxes)
            onClose();
        }
    }

    useEffect(() => {
        if (action === APP_CONFIG.actionCrud.update) {
            setTypeDocumentSelect({ icon: "", description: dataSelect.type_document })
            setTypeUserSelect({ icon: "", description: dataSelect.type_user })
        }
        setFocus('name')

    }, [setFocus, action, dataSelect, dataPermissions]);

    if (isLoading) return <div>Cargando...</div>

    return (
        <Container>
            <div className="sub-contenedor">
                <div className="headers">
                    <section>
                        <h1>
                            {action == APP_CONFIG.actionCrud.update ? "Editar usuario" : "Registrar nueva usuario"}
                        </h1>
                    </section>

                    <section>
                        <span onClick={onClose}>x</span>
                    </section>
                </div>

                <form className="formulario" onSubmit={handleSubmit(registerUser)}>
                    <section>
                        {/* email */}
                        <article>
                            <InputText icono={<v.iconoemail />}>
                                <input
                                    className="form__field"
                                    defaultValue={dataSelect.email}
                                    type="email"
                                    placeholder=""
                                    {...register("email", {
                                        required: (action==APP_CONFIG.actionCrud.update)? false: true,
                                    })}
                                    disabled={action==APP_CONFIG.actionCrud.update? true:false}
                                />
                                <label className="form__label">Email</label>
                                {errors.email?.type === "required" && <p>Campo requerido</p>}
                            </InputText>
                        </article>

                        {/* passwod */}
                        <article>
                            <InputText icono={<v.iconopass />}>
                                <input
                                    className="form__field"
                                    defaultValue={dataSelect.password}
                                    type={action==APP_CONFIG.actionCrud.update? "text":"password"}
                                    placeholder=""
                                    {...register("password", {
                                        required: true,
                                        minLength: 6,
                                    })}
                                />
                                <label className="form__label">Password</label>
                                {errors.password?.type === "required" && <p>Campo requerido</p>}
                                {errors.password?.type === "minLength" && (
                                    <p>Debe tener al menos 6 caracteres</p>
                                )}

                            </InputText>
                        </article>

                        {/* name */}
                        <article>
                            <InputText icono={<v.iconoUser />}>
                                <input
                                    className="form__field"
                                    defaultValue={dataSelect.name}
                                    type="text"
                                    placeholder=""
                                    {...register("name", {
                                        required: true,
                                    })}
                                />
                                <label className="form__label">Nombre</label>
                                {errors.nombre?.type === "required" && <p>Campo requerido</p>}
                            </InputText>
                        </article>

                        {/* type_document  */}
                        <ContentSelector>
                            <label>Tipo Documento:</label>
                            <Selector
                                text1={'🍿'}
                                text2={typeDocumentSelect?.description}
                                color={'#fc6027'}
                                state={stateTypeDocument}
                                func={() => setStateTypeDocument(!stateTypeDocument)}
                            />
                            {
                                stateTypeDocument
                                && <ListGeneric
                                    data={TypeDocumentData}
                                    scroll={"scroll"}
                                    setState={() => setStateTypeDocument(!stateTypeDocument)}
                                    bottom={"-240px"}
                                    func={(p) => setTypeDocumentSelect(p)}
                                />
                            }
                            {/* <BtnFilter
                                bgColor={'#f6f3f3'}
                                textColor={'#353535'}
                                icon={<v.agregar />}
                                func={() => addTypeDocument()}
                            /> */}
                        </ContentSelector>

                        {/* document */}
                        <article>
                            <InputText icono={<v.iconoUser />}>
                                <input
                                    className="form__field"
                                    defaultValue={dataSelect.document}
                                    type="text"
                                    placeholder=""
                                    {...register("document", {
                                        required: true,
                                    })}
                                />
                                <label className="form__label">Documento</label>
                                {errors.document?.type === "required" && <p>Campo requerido</p>}
                            </InputText>
                        </article>

                        {/* phone */}
                        <article>
                            <InputText icono={<v.iconoUser />}>
                                <input
                                    className="form__field"
                                    defaultValue={dataSelect.phone}
                                    type="text"
                                    placeholder=""
                                    {...register("phone", {
                                        required: true,
                                    })}
                                />
                                <label className="form__label">Teléfono</label>
                                {errors.phone?.type === "required" && <p>Campo requerido</p>}
                            </InputText>
                        </article>
                    </section>

                    <section>
                        {/* address */}
                        <article>
                            <InputText icono={<v.iconoUser />}>
                                <input
                                    className="form__field"
                                    defaultValue={dataSelect.address}
                                    type="text"
                                    placeholder=""
                                    {...register("address", {
                                        required: true,
                                    })}
                                />
                                <label className="form__label">Dirección</label>
                                {errors.address?.type === "required" && <p>Campo requerido</p>}
                            </InputText>
                        </article>

                        {/* type_user  */}
                        <ContentSelector>
                            <label>Tipo Usuario:</label>
                            <Selector
                                text1={'🍿'}
                                text2={typeUserSelect?.description}
                                color={'#fc6027'}
                                state={stateTypeUser}
                                func={() => setStateTypeUser(!stateTypeUser)}
                            />
                            {
                                stateTypeUser
                                && <ListGeneric
                                    data={TypeUserData}
                                    scroll={"scroll"}
                                    setState={() => setStateTypeUser(!stateTypeUser)}
                                    bottom={"-240px"}
                                    func={(p) => setTypeUserSelect(p)}
                                />
                            }
                            {/* <BtnFilter
                                bgColor={'#f6f3f3'}
                                textColor={'#353535'}
                                icon={<v.agregar />}
                                func={() => addTypeDocument()}
                            /> */}
                        </ContentSelector>

                        PERMISOS
                        <ListModules
                            checkboxes={checkboxes}
                            setCheckboxes={setCheckboxes}
                            action={action}
                        />
                    </section>

                    <div className="btnguardarContent">
                        <BtnSave
                            icon={<v.iconoguardar />}
                            title="Guardar"
                            bgcolor="#ef552b"
                        />
                    </div>
                </form>
            </div>
        </Container>
    );
}
const Container = styled.div`
  transition: 0.5s;
  top: 0;
  left: 0;
  position: fixed;
  background-color: rgba(10, 9, 9, 0.5);
  display: flex;
  width: 100%;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  z-index: 1000;

  .sub-contenedor {
    width: 85%;
    max-width: 85%;
    border-radius: 20px;
    background: ${({ theme }) => theme.bgtotal};
    box-shadow: -10px 15px 30px rgba(10, 9, 9, 0.4);
    padding: 13px 36px 20px 36px;
    z-index: 100;

    .headers {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;

      h1 {
        font-size: 20px;
        font-weight: 500;
      }
      span {
        font-size: 20px;
        cursor: pointer;
      }
    }
    .formulario {
        display: grid;
        grid-template-columns: 1 1fr;
        @media ${Device.tablet} {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
            .btnguardarContent {
                display: flex;
                justify-content: end;
                grid-column: 1;
                @media ${Device.tablet} {
                    grid-column: 2;
                }
            }
        }
        section {
            gap: 20px;
            display: flex;
            flex-direction: column;
            .colorContainer {
            .colorPickerContent {
                padding-top: 15px;
                min-height: 50px;
            }
            }
        }
    }
  }
`;

// const ContentTitle = styled.div`
//   display: flex;
//   justify-content: start;
//   align-items: center;
//   gap: 20px;
//   svg {
//     font-size: 25px;
//   }
//   input {
//     border: none;
//     outline: none;
//     background: transparent;
//     padding: 2px;
//     width: 40px;
//     font-size: 28px;
//   }
// `;
// const ContainerEmojiPicker = styled.div`
//   position: absolute;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   top: 0;
//   left: 0;
//   bottom: 0;
//   right: 0;
// `;