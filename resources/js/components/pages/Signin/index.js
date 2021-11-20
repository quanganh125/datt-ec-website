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
import { InputAdornment, IconButton } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { toast } from "react-toastify";
import { validateEmail, validatePassword } from "../../utils/validate";
import { setCookie } from "./../../utils/cookie";
import { useHistory } from "react-router-dom";

const api = "http://127.0.0.1:8000/api/auth/login";

export default function Signin({ setAuth }) {
    const classes = useStyles();
    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    const [errorEmail, setErrorEmail] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const [loginFaild, setLoginFaild] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const history = useHistory();
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);
    const handleOnChange = (e) => {
        setUser((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const validate = () => {
        let state = true;

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
        console.log(user);
        let userLogin = {
            email: user.email,
            password: user.password,
        };
        if (validate()) {
            await axios
                .post(`${api}`, userLogin)
                .then((res) => {
                    const data = res.data;
                    if (data.access_token) {
                        toast.success("Đăng nhập thành công!");
                        setCookie("access_token", data.access_token, 3600);
                    }
                    setLoginFaild("");
                    setErrorPassword("");
                    history.push("/");
                    window.location.reload();
                })
                .catch((error) => {
                    toast.error("Đăng nhập không thành công!");
                    setLoginFaild("Email hoặc mật khẩu sai!");
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
                    ログイン
                </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        error={errorEmail != "" ? true : false}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={(e) => handleOnChange(e)}
                    />
                    <p id="validateEmail" className={classes.nofi}>
                        {errorEmail}
                    </p>
                    <TextField
                        error={errorPassword != "" ? true : false}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        id="password"
                        autoComplete="current-password"
                        onChange={(e) => handleOnChange(e)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() =>
                                            handleClickShowPassword()
                                        }
                                        onMouseDown={() =>
                                            handleMouseDownPassword()
                                        }
                                    >
                                        {showPassword ? (
                                            <Visibility />
                                        ) : (
                                            <VisibilityOff />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <p id="validatepassword" className={classes.nofi}>
                        {errorPassword}
                    </p>
                    <p id="loginFaild" className={classes.nofi}>
                        {loginFaild}
                    </p>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={(e) => handleSubmit(e)}
                    >
                        Login
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link to="/" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link to="/register">
                                Don't have an account? Sign Up
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}
