import React from "react";

import { Formik, FormikHelpers, FormikProps, FormikValues, Form as FormikForm } from "formik";
import * as Yup from "yup";

import styles from "./Form.module.css";

interface FormProps<T> {
    enableReinitialize?: boolean;
    initialValues: T;
    validationSchema: Yup.ObjectSchema<Partial<T>>;
    onSubmit: (values: T, formikHelpers: FormikHelpers<T>) => void | Promise<void>;
    children: (formikProps: FormikProps<T>) => React.ReactNode;
}

const Form = <T extends FormikValues>({ initialValues, validationSchema, enableReinitialize = false, onSubmit, children }: FormProps<T>) => {
    return (
        <div className={styles.formWrapper}>
            <Formik
                enableReinitialize={enableReinitialize}
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {(formikProps) => (
                    <FormikForm className={`${styles.form} `}>
                        {children(formikProps)}
                    </FormikForm>
                )}
            </Formik>
        </div>
    );
};

export default Form;