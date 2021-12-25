import React, { useEffect, useState } from "react";
import "./formbuy.scss";
import { Button } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { toast } from "react-toastify";
import axios from "axios";
import { headers, apiHistory } from "./../../constant";

export default function FormBuy({
    isOpen,
    product_id,
    image_link,
    name,
    price,
    description,
    setIsOpenBuy,
    stock,
    category_id,
}) {
    const [open, setOpen] = useState(false);
    const [total, setTotal] = useState(price);
    const [quantily, setQuantily] = useState(1);
    const [buyEnable, setBuyEnable] = useState(true);
    const [validateNofi, setValidateNofi] = useState("");
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setIsOpenBuy(false);
        setOpen(false);
    };
    const handleCheckout = async () => {
        const buyProduct = {
            product_id: product_id,
            category_id: category_id,
            quantity: quantily,
            price_at_purchase_time: total,
        };
        try {
            await axios
                .post(apiHistory, buyProduct, { headers: headers })
                .then((res) => {
                    toast.success("購入に成功しました");
                });
        } catch (error) {
            return { statusCode: 500, body: error.toString() };
        }
        handleClose();
    };

    useEffect(() => {
        setOpen(isOpen);
        return () => {
            setTotal(price);
            setQuantily(1);
            setBuyEnable(true);
            setValidateNofi("");
        };
    }, [isOpen]);

    const onChangeQuantity = (event) => {
        let nquantily = event.target.value;
        if (nquantily == "" || nquantily <= 0) {
            setValidateNofi("数値は0より大きくなければなりません");
            setBuyEnable(false);
            setTotal(0);
        } else if (nquantily > stock) {
            setValidateNofi(
                `在庫が残っている商品は${stock}のみです。これ以上購入することはできません`
            );
            setBuyEnable(false);
            setTotal(0);
        } else {
            setBuyEnable(true);
            setValidateNofi("");
            let sum = nquantily * price;
            setQuantily(nquantily);
            setTotal(sum);
        }
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
                                    defaultValue={1}
                                    min="1"
                                    onChange={(event) =>
                                        onChangeQuantity(event)
                                    }
                                />
                            </div>
                            <div className="product-line-price-cart">
                                {total}
                            </div>
                        </div>
                        <div>
                            <span style={{ color: "red", float: "right" }}>
                                {validateNofi}
                            </span>
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
                        disabled={!buyEnable}
                    >
                        チェックアウト
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
