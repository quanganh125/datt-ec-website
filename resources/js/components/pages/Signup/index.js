import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import useStyles from "./styles";
import Container from "@material-ui/core/Container";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { setCookie } from "../../utils/cookie";
import {
    validateName,
    validateEmail,
    validatePassword,
} from "../../utils/validate";
import { api } from "../../constant";

const apiSignup = `${api}api/auth/register`;

export default function Signup() {
    const classes = useStyles();
    const history = useHistory();
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [errorEmail, setErrorEmail] = useState("");
    const [errorName, setErrorName] = useState("");
    const [errorPassword, setErrorPassword] = useState("");

    const handleOnChange = (e) => {
        setUser((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const validate = () => {
        let state = true;

        if (!validateName(user.name).state) {
            setErrorName(validateName(user.name).error);
            state = false;
        } else {
            setErrorName("");
        }

        if (!validateEmail(user.email).state) {
            setErrorEmail(validateEmail(user.email).error);
            state = false;
        } else {
            setErrorEmail("");
        }

        if (!validatePassword(user.password).state) {
            setErrorPassword(validatePassword(user.password).error);
            state = false;
        } else {
            setErrorPassword("");
        }
        return state;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let userRegister = {
            name: user.name,
            email: user.email,
            password: user.password,
            password_confirmation: user.confirmPassword,
        };
        if (validate()) {
            await axios
                .post(`${apiSignup}`, userRegister)
                .then((res) => {
                    const data = res.data;
                    setErrorPassword("");
                    toast.success("サインアップ成功！");
                    history.push("/login");
                })
                .catch((error) => {
                    console.error(error);
                    toast.error("サインアップに失敗しました！");
                });
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    サインアップ
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                error={errorName != "" ? true : false}
                                variant="outlined"
                                required
                                fullWidth
                                id="name"
                                label="ユーザー名"
                                name="name"
                                autoComplete="name"
                                onChange={(e) => handleOnChange(e)}
                            />
                        </Grid>
                        <p id="validateEmail" className={classes.nofi}>
                            {errorName}
                        </p>
                        <Grid item xs={12}>
                            <TextField
                                error={errorEmail != "" ? true : false}
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="メール"
                                name="email"
                                autoComplete="email"
                                onChange={(e) => handleOnChange(e)}
                            />
                        </Grid>
                        <p id="validateEmail" className={classes.nofi}>
                            {errorEmail}
                        </p>
                        <Grid item xs={12}>
                            <TextField
                                error={errorPassword != "" ? true : false}
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="パスワード"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={(e) => handleOnChange(e)}
                            />
                        </Grid>
                        <p id="validateEmail" className={classes.nofi}>
                            {errorPassword}
                        </p>
                        <Grid item xs={12}>
                            <TextField
                                error={errorPassword != "" ? true : false}
                                variant="outlined"
                                required
                                fullWidth
                                name="confirmPassword"
                                label="パスワードを認証"
                                type="password"
                                id="confirmPassword"
                                autoComplete="current-password"
                                onChange={(e) => handleOnChange(e)}
                            />
                        </Grid>
                        <p id="validateEmail" className={classes.nofi}>
                            {errorPassword}
                        </p>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={(e) => handleSubmit(e)}
                    >
                        サインアップ
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link to="/login">
                                すでにアカウントをお持ちですか？ ログイン
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}
