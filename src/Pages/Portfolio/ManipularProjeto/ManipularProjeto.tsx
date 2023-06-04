import React from "react";

import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";

import Input from "../../../Components/Forms/Input";
import Button from "../../../Components/Common/Button";
import Title from "../../../Components/Common/Title";
import Form from "../../../Components/Forms/Form";

import { Projeto, createOrUpdateProjeto } from "../../../services/portfolioService";

const ManipularProjeto: React.FC = () => {
    const navigate = useNavigate();
    const portfolio = useLocation().state as Projeto;

    const initialValues: Projeto = {
        link: "",
        image: "",
        title: ""
    };

    const validationSchema = Yup.object().shape({
        id: Yup.number(),
        link: Yup.string().required('Campo obrigatório'),
        image: Yup.string().required('Campo obrigatório'),
        title: Yup.string().required('Campo obrigatório'),
    });

    const onSubmit = async (values: Projeto, { resetForm }: { resetForm: () => void }) => {
        try {
            await createOrUpdateProjeto(values);
            resetForm();
            navigate("/portfolio/listar");
            alert('Formulário enviado com sucesso!');

        } catch (error) {
            console.log(error);
            alert('Ocorreu um erro ao enviar o formulário');

        }
    };

    return (
        <Form
            initialValues={portfolio || initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {({ errors, touched }) => (
                
                <>
                    {
                        !portfolio ?
                        <Title>Cadastrar Projeto</Title>
                        :
                        <Title>Atualizar Projeto</Title>
                    }

                    <Input
                        label="Título"
                        name="title"
                        errors={errors.title}
                        touched={touched.title}
                    />
                    <Input
                        label="Imagem"
                        name="image"
                        errors={errors.image}
                        touched={touched.image}
                    />
                    <Input
                        label="Link"
                        name="link"
                        errors={errors.link}
                        touched={touched.link}
                    />

                    <Button type="submit">Salvar</Button>

                </>
            )}
        </Form>
    );
};

export default ManipularProjeto;

