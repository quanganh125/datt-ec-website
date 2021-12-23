import { Grid, Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import useStyles from "./styles";
import TextField from "@material-ui/core/TextField";
import Rating from "../Rate";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { apiReview } from "../../constant/index";
import { toast } from "react-toastify";
import { headers } from "../../redux/actions/productActions.js";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function RatingForm({
    isOpen,
    setIsOpen,
    productId,
    reloadReview,
}) {
    const classes = useStyles();

    const [evaluate, setEvaluate] = useState("");
    const [numStar, setNumStar] = useState(0);

    const handleGetNumStar = (num) => {
        setNumStar(num);
    };

    const handleOnChange = (e) => {
        setEvaluate(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (evaluate == "" && numStar == 0) {
            alert("製品を評価するには、完全な情報を入力する必要があります");
        } else {
            const review = {
                rating: numStar,
                comment: evaluate,
                product_id: productId,
            };
            await axios
                .post(apiReview, review, { headers: headers })
                .then((response) => {
                    reloadReview();
                    toast.success("レビューが正常に追加されました！");
                })
                .catch((error) => {
                    toast.error("レビューの追加に失敗しました！");
                    console.error("ERROR:: ", error.response.data);
                });
        }
        handleClose();
    };

    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        setOpen(isOpen);
        return () => {
            setEvaluate("");
            setNumStar(0);
        };
    }, [isOpen]);

    const handleClose = () => {
        setNumStar(0);
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
                                numStar={numStar}
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
                                value={evaluate}
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
