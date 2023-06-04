import React from "react";

import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

import styles from "./Login.module.css";

import Form from "../../Components/Forms/Form/Form";
import Input from "../../Components/Forms/Input/Input";
import Button from "../../Components/Common/Button/Button";
import Title from "../../Components/Common/Title/Title";

import { User, login as loginService } from "../../services/authService";

import { useAuth } from "../../Contexts/authContext";

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

const initialValues: User = {
    email: "",
    password: "",
};

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email("E-mail inválido")
        .required("E-mail é obrigatório"),
    password: Yup.string()
        .min(6, "A senha deve ter no mínimo 6 caracteres")
        .required("Senha é obrigatória"),
});

const onSubmit = async (values: User) => {
    try {
        const user = await loginService(values);
        login(user);
        navigate("/home");
    } catch (error) {
        alert("Erro ao realizar login");
    }
};

return (
    <div className={styles.loginWrapper}>
        <Form
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {({ errors, touched }) => (
                <>
                    <Title>MEU SITE PESSOAL</Title>

                    <Input
                        label="E-mail"
                        name="email"
                        type="email"
                        errors={errors.email}
                        touched={touched.email}
                    />
                    
                    <Input
                        label="Senha"
                        name="password"
                        type="password"
                        errors={errors.password}
                        touched={touched.password}
                    />
                    
                    <Button type="submit">Entrar</Button>
                    </>
                )}
        </Form>
    </div>
);

};
export default Login;
