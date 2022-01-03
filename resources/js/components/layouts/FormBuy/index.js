import React, { useEffect, useState } from "react";
import "./formbuy.scss";
import { Button } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { toast } from "react-toastify";
import axios from "axios";
import { headers, apiHistory, apiProduct, apiCoupon } from "./../../constant";

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
    updateQuantity,
}) {
    const [open, setOpen] = useState(false);
    const [total, setTotal] = useState(price);
    const [quantily, setQuantily] = useState(1);
    const [buyEnable, setBuyEnable] = useState(true);
    const [discountCode, setDiscountCode] = useState("");
    const [discountPercent, setDiscountPercent] = useState(0);
    const [discountValue, setDiscountValue] = useState(0);
    const [validateNofi, setValidateNofi] = useState("");
    const [validateCode, setValidateCode] = useState("");
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setIsOpenBuy(false);
        setOpen(false);
    };
    const handleCheckout = async () => {
        //update history
        const buyProduct = {
            product_id: product_id,
            category_id: category_id,
            quantity: quantily,
            price_at_purchase_time:
                total - discountValue >= 0 ? total - discountValue : 0,
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

        //update stock product
        let remain = stock - quantily;
        const updateStock = {
            feild: "stock",
            value: remain,
        };
        try {
            await axios
                .post(`${apiProduct}/${product_id}/editOne`, updateStock)
                .then((res) => {
                    //update ui
                    updateQuantity(remain);
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

    const onChangeCode = (event) => {
        let code = event.target.value;
        setDiscountCode(code);
    };

    const onSubmitDiscountCode = async () => {
        if (!discountCode) {
            setValidateCode("割引コードを入力していません");
            return;
        }
        try {
            await axios
                .get(`${apiCoupon}/discount/${discountCode}`)
                .then((res) => {
                    if (res.data[0]) {
                        let percent = res.data[0].discount;
                        setDiscountPercent(percent);
                        setDiscountValue(Math.round(total * (percent / 100)));
                    } else {
                        setValidateCode(
                            "割引コードが無効であるか、有効期限が切れています"
                        );
                    }
                });
        } catch (error) {
            return { statusCode: 500, body: error.toString() };
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
                                    name="quantity"
                                    min="1"
                                    className="input-quatity"
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
                        <div className="discount-code-form">
                            <h6>割引コード</h6>
                            <input
                                type="text"
                                name="code"
                                className="input-code"
                                onChange={(event) => onChangeCode(event)}
                            />
                            <Button
                                onClick={(event) => onSubmitDiscountCode(event)}
                                color="primary"
                                variant="contained"
                                className="apply-code"
                            >
                                申し込み
                            </Button>
                            <p style={{ color: "red" }}>{validateCode}</p>
                        </div>
                        <div className="totals-cart">
                            <div className="discount-item-cart">
                                <label>商品の金額</label>
                                <div className="discount-value-cart">
                                    {total}円
                                </div>
                            </div>
                            <div className="discount-item-cart">
                                <label>割引(-{discountPercent}%)</label>
                                <div className="discount-value-cart">
                                    -{discountValue}円
                                </div>
                            </div>
                            <div className="totals-item-cart totals-item-total-cart">
                                <label>合計</label>
                                <div
                                    className="totals-value-cart"
                                    id="cart-total-cart"
                                >
                                    {total - discountValue}
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
