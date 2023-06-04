import React from "react";

import { NavLink } from "react-router-dom";
import { useAuth } from "../../../Contexts/authContext";

import styles from "./Sidebar.module.css";

const Sidebar: React.FC = () => {
    const { logout } = useAuth();

    return (
        <div className={styles.sidebar}>
            <nav className={styles.navigation}>

                <ul>
                    <li>
                        <NavLink to="/home">
                            <h3>Home</h3>
                        </NavLink>
                    </li>
                </ul>

                <h3>Currículo</h3>
                <ul>
                    <li>
                        <NavLink to="/curriculo/informacoes">
                            Informações
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/curriculo/experiencia/cadastrar">
                            Cadastrar Experiência
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/curriculo/experiencia/listar">
                            Listar de Experiências
                        </NavLink>
                    </li>
                </ul>

                <h3>Portfólio</h3>
                <ul>
                    <li>
                        <NavLink to="/projeto/cadastrar">
                            Cadastrar Projeto
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/portfolio/listar">
                            Listar Portfólio
                        </NavLink>
                    </li>
                </ul>

                <ul>
                    <li>
                        <NavLink onClick={logout} to="/login">
                            <h3>Logout</h3>
                        </NavLink>
                    </li>
                </ul>

            </nav>
        </div>
    );

};

export default Sidebar;