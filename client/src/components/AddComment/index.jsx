import React, {useState} from "react";

import styles from "./AddComment.module.scss";

import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import {useSelector} from "react-redux";

export const Index = ({sendComment}) => {
    const {data} = useSelector((state) => state.auth);
    const [value, setValue] = useState("")
    const send = () => {
        sendComment(value)
        setValue("")
    }

    return (
        <>
            <div className={styles.root}>
                <Avatar
                    classes={{root: styles.avatar}}
                    src={data.avatarUrl}
                />
                <div className={styles.form}>
                    <TextField
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        label="Написать комментарий"
                        variant="outlined"
                        maxRows={10}
                        multiline
                        fullWidth
                    />
                    <Button onClick={send} variant="contained">Отправить</Button>
                </div>
            </div>
        </>
    );
};
