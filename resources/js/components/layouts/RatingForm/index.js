import { Grid, Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import useStyles from "./styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { TramRounded } from "@material-ui/icons";
import Rating from "../Rate";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function RatingForm({ isOpen, setIsOpen, idProduct }) {
    const classes = useStyles();

    const [evaluate, setEvaluate] = useState("");
    const [numStar, setNumStar] = useState(0);

    const handleGetNumStar = (num) => {
        setNumStar(num);
        console.log("num", num);
    };

    const handleOnChange = (e) => {
        setEvaluate(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("submit tai day");
        //kiem tra dieu kien
        if (evaluate == "" && numStar == 0) {
            alert("製品を評価するには、完全な情報を入力する必要があります");
        } else {
            //cho goi api
        }
        handleClose();
    };

    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        setOpen(isOpen);
    }, [isOpen]);

    const handleClose = () => {
        setIsOpen(false);
        setOpen(false);
    };
    return (
        <div className={classes.root}>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">
                    {"製品をどのように評価しますか？"}
                </DialogTitle>
                <DialogContent>
                    <Grid container>
                        <Grid item xs={12} className={classes.rateContainer}>
                            <Rating
                                choice={true}
                                handleGetNumStar={handleGetNumStar}
                            />
                        </Grid>
                        <Grid item xs={12} className={classes.commentContainer}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                name="rate"
                                type="text"
                                placeholder="評価を入力してください。。。"
                                id="rate"
                                onChange={(e) => handleOnChange(e)}
                                className={classes.inputRate}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleClose}
                        color="secondary"
                        variant="contained"
                        className={classes.dialogaction}
                    >
                        キャンセル
                    </Button>
                    <Button
                        onClick={(e) => handleSubmit(e)}
                        color="primary"
                        variant="contained"
                        className={classes.dialogaction}
                    >
                        送信
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
