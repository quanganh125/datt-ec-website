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
import { apiAuthLogin } from "../../constant";
import { useDispatch, useSelector } from "react-redux";
import { setHideNav } from "../../redux/actions/userActions";

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
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);
    const handleOnChange = (e) => {
        setUser((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const dispatch = useDispatch();
    const hideNav = () => {
        dispatch(setHideNav());
    };
    useEffect(() => {
        hideNav();
    }, []);
    const isShowNav = useSelector((state) => state.user.isShowNav);

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
        let userLogin = {
            email: user.email,
            password: user.password,
        };
        if (validate()) {
            await axios
                .post(apiAuthLogin, userLogin)
                .then((res) => {
                    const data = res.data;
                    if (data.access_token) {
                        toast.success("正常にログインしました！");
                        setCookie("access_token", data.access_token, 3600);
                    }
                    setLoginFaild("");
                    setErrorPassword("");
                    window.location.href = `/home`;
                })
                .catch((error) => {
                    toast.error("ログインに失敗しました！");
                    setLoginFaild(
                        "メールアドレスまたはパスワードが間違っています！"
                    );
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
                        label="メール"
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
                        label="パスワード"
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
                        <Grid item xs={6}></Grid>
                        <Grid item xs={6}>
                            <Link to="/register">
                                アカウントをお持ちではありませんか？
                                サインアップ
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}
