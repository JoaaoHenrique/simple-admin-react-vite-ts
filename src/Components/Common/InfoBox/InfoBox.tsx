import React from "react";

import styles from "./InfoBox.module.css";

interface InfoBoxProps {
    title: string;
    value: number | string;
    icon?: React.ReactNode;
}

const InfoBox: React.FC<InfoBoxProps> = ({ title, value, icon }) => {
    return (
        <div className={styles.InfoBox}>
            <h3>{title}</h3>
            <div className={styles.InfoContainer}>
                {icon}
                <h1>{value}</h1>
            </div>

        </div>
    );
}

export default InfoBox;