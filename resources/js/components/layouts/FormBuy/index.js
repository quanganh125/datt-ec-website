import React, { useEffect, useState } from "react";
import "./formbuy.scss";
import { Button } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { toast } from "react-toastify";

export default function FormBuy({
    isOpen,
    product_id,
    image_link,
    name,
    price,
    description,
    setIsOpenBuy,
    handleBuy,
}) {
    const [open, setOpen] = useState(false);
    const [total, setTotal] = useState(price);
    const [quality, setQuality] = useState(1);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setIsOpenBuy(false);
        setOpen(false);
    };
    const handleCheckout = () => {
        handleClose();
        toast.success("購入に成功しました！");
    };

    useEffect(() => {
        setOpen(isOpen);
    }, [isOpen]);

    const onChangeQuality = (event) => {
        let nquality = event.target.value;
        if (nquality == "" || nquality == 0) {
            setQuality(1);
        }
        let sum = nquality * price;
        nquality > 0 ? setTotal(sum) : null;
    };

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
                fullWidth
                maxWidth="md"
                style={{ minWidth: 400 }}
            >
                <DialogTitle id="form-dialog-title">
                    ショッピングカート
                </DialogTitle>
                <DialogContent>
                    <div className="shopping-cart">
                        <div className="column-labels-cart">
                            <label className="product-image-cart">Image</label>
                            <label className="product-details-cart">
                                Product
                            </label>
                            <label className="product-price-cart">Price</label>
                            <label className="product-quantity-cart">
                                Quantity
                            </label>
                            <label className="product-line-price-cart">
                                Total
                            </label>
                        </div>

                        <div className="product-cart">
                            <div className="product-image-cart">
                                <img src={image_link} alt="image-cart" />
                            </div>
                            <div className="product-details-cart">
                                <div className="product-title-cart">{name}</div>
                                <p className="product-description-cart">
                                    {description}
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                </p>
                            </div>
                            <div className="product-price-cart">{price}</div>
                            <div className="product-quantity-cart">
                                <input
                                    type="number"
                                    defaultValue={quality}
                                    min="1"
                                    onChange={(event) => onChangeQuality(event)}
                                />
                            </div>
                            <div className="product-line-price-cart">
                                {total}
                            </div>
                        </div>

                        <div className="totals-cart">
                            <div className="totals-item-cart totals-item-total-cart">
                                <label>合計</label>
                                <div
                                    className="totals-value-cart"
                                    id="cart-total-cart"
                                >
                                    {total}
                                </div>
                            </div>
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={(e) => handleClose()}
                        color="secondary"
                        variant="contained"
                    >
                        キャンセル
                    </Button>
                    <Button
                        onClick={(e) => handleCheckout()}
                        color="primary"
                        variant="contained"
                    >
                        チェックアウト
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
