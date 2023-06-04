import React, { useEffect, useState } from "react";

import * as Yup from "yup";
import { AxiosError } from "axios";

import Input from "../../../Components/Forms/Input";
import Textarea from "../../../Components/Forms/Textarea";
import Button from "../../../Components/Common/Button/Button";
import InformacoesCard from "./InformacoesCard";
import Title from "../../../Components/Common/Title";
import Form from "../../../Components/Forms/Form";

import { Informacoes, updateInformacoes, getInformacoes } from "../../../services/informacoesService";

import styles from "./ManipularInformacoes.module.css"

const ManipularInformacoes: React.FC = () => {
    const [informacoes, setInformacoes] = useState<Informacoes>();

    const initialValues: Informacoes = {
        foto: '',
        nome: '',
        cargo: '',
        resumo: '',
    };

    const validationSchema = Yup.object().shape({
        id: Yup.number(),
        foto: Yup.string().required('Campo obrigatório'),
        nome: Yup.string().required('Campo obrigatório'),
        cargo: Yup.string().required('Campo obrigatório'),
        resumo: Yup.string().required('Campo obrigatório'),
    });

    const fetchInformacao = async () => {
        try {
            const informacao = await getInformacoes();
            setInformacoes(informacao);

        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.response?.status !== 404) {
                    console.log('Erro ao busca informação:', error);
                }
            } else {
                console.log("Ocorreu um erro desconhecido ao buscar informações:", error);
            }
        }
    };

    useEffect(() => {
        fetchInformacao()
    }, []);

    const onSubmit = async (values: Informacoes, { resetForm }: { resetForm: () => void }) => {
        try {
            await updateInformacoes(values);
            setInformacoes(values);
            alert('Formulário enviado com sucesso!');

        } catch (error) {
            console.log('Erro ao enviar o formulário:', error);
            alert('Ocorreu um erro ao enviar o formulário. Tente novamente.');

        }

    };

    const handleDelete = async () => {
        try {

            await updateInformacoes(initialValues);
            setInformacoes(undefined);
            alert('Informações deletadas com sucesso!');

        } catch (error) {

            console.log('Erro ao deletar informações:', error);
            alert('Ocorreu um erro ao deletar as informações. Tente novamente.');

        }
    };

    return (
        <div className={styles.container}>
            <Form
                initialValues={informacoes || initialValues}
                enableReinitialize={true}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({ errors, touched }) => (
                    <>

                        <Title>Informações</Title>

                        <Input
                            label="Foto"
                            name="foto"
                            errors={errors.foto}
                            touched={touched.foto}
                        />

                        <Input
                            label="Nome"
                            name="nome"
                            errors={errors.nome}
                            touched={touched.nome}
                        />

                        <Input
                            label="Cargo"
                            name="cargo"
                            errors={errors.cargo}
                            touched={touched.cargo}
                        />

                        <Textarea
                            label="Resumo"
                            name="resumo"
                            errors={errors.resumo}
                            touched={touched.resumo}
                        />

                        <Button type="submit">Salvar</Button>

                    </>
                )}

            </Form >
            {informacoes &&
                <div className={styles.cardContainer}>
                    <InformacoesCard informacoes={informacoes} />
                    <Button onClick={handleDelete} red>Deletar</Button>
                </div>
            }
        </div>

    );
};

export default ManipularInformacoes;