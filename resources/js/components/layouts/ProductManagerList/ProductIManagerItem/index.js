import React, { useState, useEffect } from "react";
import "./productManagerItem.scss";
import { Button } from "@material-ui/core";
import Logo from "../../../../assets/images/facebook.png";
import Rate from "./../../Rate";
import { Link } from "react-router-dom";
import { Grid } from "@material-ui/core";
import { useHistory } from "react-router-dom";

//dialog
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { deleteProduct } from "./../../../redux/actions/productActions";
import { useDispatch, useSelector } from "react-redux";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Item({ data }) {
    const [linkDetail, setLinkDetail] = useState("");
    const [reviews, setReviews] = useState([]);
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        setLinkDetail(`/product/${data.id}/edit`);
    }, [linkDetail]);

    const goToDetail = () => {
        history.push(linkDetail);
    };

    const handleDeleteProduct = (id) => {
        console.log("Xoa san pham co id: ", id);
        dispatch(deleteProduct(id));
        handleClose();
    };

    useEffect(() => {
        setReviews(data.reviews);
    }, []);

    //popup confirm delete
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Grid container className="item-manager-container">
                <Grid item className="item-manager-image" xs={3}>
                    <img
                        src={data.image_link}
                        alt="productImg"
                        className="itemImg"
                    />
                </Grid>
                <Grid item className="item-manager-content" xs={6}>
                    <h6>{data.name}</h6>
                    <p>Review count: {reviews.length}</p>
                </Grid>
                <Grid item className="item-manager-button" xs={3}>
                    <Button
                        color="primary"
                        variant="contained"
                        className="item-btn-manager"
                        style={{ fontSize: 15, marginBottom: 2 }}
                        onClick={() => goToDetail()}
                    >
                        Chỉnh sửa
                    </Button>
                    <Button
                        color="secondary"
                        variant="contained"
                        className="item-btn-manager"
                        style={{ fontSize: 15, marginTop: 2 }}
                        onClick={() => handleClickOpen()}
                    >
                        Xóa
                    </Button>
                </Grid>
            </Grid>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>
                    {"この商品を削除してもよろしいですか？"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        {data.name}製品は完全に削除されます。
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>キャンセル</Button>
                    <Button onClick={() => handleDeleteProduct(data.id)}>
                        はい
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
