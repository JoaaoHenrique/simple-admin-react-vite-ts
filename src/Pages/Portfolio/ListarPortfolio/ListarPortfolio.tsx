import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { Table, Column } from "../../../Components/Common/Table";

import { Projeto, getPortfolio, deleteProjeto } from "../../../services/portfolioService";

const ListarPortfolio: React.FC = () => {
    const navigate = useNavigate();
    const [portfolio, setPortfolio] = useState<Projeto[]>([]);

    const fetchPortfolio = async () => {
        try {
            const portfolio = await getPortfolio();
            setPortfolio(portfolio);

        } catch (error) {
            console.log('Erro ao buscar Portfólio');

        }
    };

    useEffect(() => {
        fetchPortfolio();
    }, []);


    const handleEdit = async (itemPortfolio: Projeto) => {
        navigate("/projeto/atualizar", { state: itemPortfolio })
    };

    const handleDelet = async (portfolio: Projeto) => {
        try {
            await deleteProjeto(portfolio.id);
            fetchPortfolio();
            alert('Portfólio excluído com sucesso!');

        } catch (error) {
            console.log(error);
            alert('Ocorreu um erro ao excluir o portfólio')
        }

    };

    const columns: Column<Projeto>[] = [
        { header: "Título", accessor: "title" },
        { header: "Imagem", accessor: "image" },
        { header: "Link", accessor: "link" }
    ];

    return (
        <Table
            columns={columns}
            data={portfolio}
            handleEdit={handleEdit}
            handleDelete={handleDelet}
        />
    );
};

export default ListarPortfolio;