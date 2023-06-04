import React from "react";

import { Navigate, Route, Routes } from "react-router-dom";

import { useAuth } from "../Contexts/authContext";

import Layout from "../Components/Layout";

import Home from "../Pages/Home";
import ManipularInformacoes from "../Pages/Curriculo/ManipularInformacoes";
import ListarExperiencia from "../Pages/Curriculo/ListarExperiencia";
import ManipularExperiencia from "../Pages/Curriculo/ManipularExperiencia";
import ListarPortfolio from "../Pages/Portfolio/ListarPortfolio";
import ManipularProjeto from "../Pages/Portfolio/ManipularProjeto";

const AuthRoutes: React.FC = () => {
    const { authenticated, isLoading } = useAuth();

    if (isLoading) {
        return <p>Carregando...</p>
    }

    if (!authenticated) {
        return <Navigate to="/login" />;
    }

    return (
        <Layout>
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/curriculo/informacoes" element={<ManipularInformacoes />} />
                <Route path="/curriculo/experiencia/cadastrar" element={<ManipularExperiencia />} />
                <Route path="/curriculo/experiencia/atualizar" element={<ManipularExperiencia />} />
                <Route path="/curriculo/experiencia/listar" element={<ListarExperiencia />} />
                <Route path="/projeto/cadastrar" element={<ManipularProjeto />} />
                <Route path="/projeto/atualizar" element={<ManipularProjeto />} />
                <Route path="/portfolio/listar" element={<ListarPortfolio />} />
            </Routes>
        </Layout>
    );
};

export default AuthRoutes;