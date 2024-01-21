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
import { ContentSelector } from "../../atomos/ContentSelector";
import { Selector } from "../Selector";
import { ListGeneric } from "../ListGeneric";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FormContainer } from "./formr.style";
import { Searcher } from "../Searcher";
import { useProductStore } from "../../../store/ProductStore";



export function RegisterKardex({
    onClose,
    dataSelect,
    action,
    movementType
}) {
    const [stateTypeDocument, setStateTypeDocument] = useState(false)
    const [typeDocumentSelect, setTypeDocumentSelect] = useState(TypeDocumentData[0])
    const [typeUserSelect, setTypeUserSelect] = useState(TypeUserData[0])

    const insertUser = useUserStore((state) => state.insert)
    const updateUser = useUserStore((state) => state.update)
    const dataCompany = useCompanyStore((state) => state.data)

    const getPermissionsByUser = useUserStore((state) => state.getPermissions)
    const dataPermissions = useUserStore((state) => state.dataPermissions)

    const setStrSearchProduct = useProductStore((state) => state.setStrSearch)
    const selectProduct = useProductStore((state) => state.selectProduct)
    const dataProduct = useProductStore((state) => state.data)
    const itemSelectProduct = useProductStore((state) => state.itemSelect)
    const [stateListProduct, setStateListProduct] = useState(false)


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
            await updateUser(p)
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

            await insertUser(pUser, pAuth, dataCompany.id)
            onClose();
        }
    }

    useEffect(() => {
        if (action === APP_CONFIG.actionCrud.update) {
            setTypeDocumentSelect({ icon: "", description: dataSelect.type_document })
            setTypeUserSelect({ icon: "", description: dataSelect.type_user })
        }
        else {
            selectProduct(null)
        }
        setFocus('name')

    }, [setFocus, action, dataSelect, dataPermissions]);

    if (isLoading) return <div>Cargando...</div>

    return (
        <FormContainer>
            <div className="sub-contenedor">
                <div className="headers">
                    <section>
                        <h1>
                            {movementType == APP_CONFIG.movementType.incoming ? "ENTRADA" : "SALIDA"}
                        </h1>
                    </section>
                    <section>
                        <h1>
                            {action == APP_CONFIG.actionCrud.update ? "Editar usuario" : "Registrar nueva usuario"}
                        </h1>
                    </section>

                    <section>
                        <span className="text-lg" onClick={onClose}>x</span>
                    </section>
                </div>

                {/* Search Product */}
                <div className="sectionSearcher flex justify-start  ">
                    <div onClick={() => setStateListProduct(!stateListProduct)}>
                        <Searcher
                            setSearcher={setStrSearchProduct}
                        />
                    </div>
                    {
                        stateListProduct &&
                        <ListGeneric
                            data={dataProduct ?? []}
                            setState={() => setStateListProduct(!stateListProduct)}
                            func={selectProduct}
                            scroll={scroll}
                            bottom={'-250px'}
                        />
                    }
                </div>

                {
                    itemSelectProduct &&
                    <CardProduct>
                        <span style={{ color: "#1fee61", fontWeight: "bold" }}>
                            {itemSelectProduct.description}
                        </span>
                        <span style={{ color: "#f6faf7" }}>
                            stock actual: {itemSelectProduct.stock}
                        </span>
                    </CardProduct>
                }


                <form className="formulario" onSubmit={handleSubmit(registerUser)}>

                    <section>


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
        </FormContainer>
    );
}

const CardProduct = styled.section`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  border-radius: 15px;
  border: 1px dashed #54f04f;
  background-color: rgba(84, 240, 79, 0.1);
  padding: 10px;
`;