import React, { useEffect, useState } from "react";
import "./formbuy.scss";
import { Button } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { toast } from "react-toastify";
import axios from "axios";
import ReactHtmlParser from "react-html-parser";
import { headers, apiHistory, apiProduct, apiCoupon } from "./../../constant";

export default function FormBuy({
    isOpen,
    product_id,
    image_link,
    name,
    price,
    setIsOpenBuy,
    stock,
}) {
    const [open, setOpen] = useState(false);
    const [total, setTotal] = useState(price);
    const [quantity, setQuantity] = useState(1);
    const [buyEnable, setBuyEnable] = useState(true);
    const [discountCode, setDiscountCode] = useState("");
    const [discountPercent, setDiscountPercent] = useState(0);
    const [discountValue, setDiscountValue] = useState(0);
    const [validateNofi, setValidateNofi] = useState("");
    const [validateCode, setValidateCode] = useState("");
    const [deliveryAddress, setDeliveryAddress] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleClose = () => {
        setIsOpenBuy(false);
        setOpen(false);
    };
    const handleCheckout = async () => {
        if (!deliveryAddress) {
            setErrorMessage("配送先住所を入力してください");
        } else {
            //update history
            setErrorMessage("");
            const buyProduct = {
                product_id: product_id,
                delivery_address: deliveryAddress,
                quantity: quantity,
                price_at_purchase_time:
                    total - discountValue >= 0 ? total - discountValue : 0,
                discount_at_purchase_time: discountValue,
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
            window.location.href = `/history`;
        }
    };

    useEffect(() => {
        setOpen(isOpen);
        return () => {
            setTotal(price);
            setQuantity(1);
            setBuyEnable(true);
            setValidateNofi("");
            setDiscountCode("");
            setDiscountPercent(0);
            setDiscountValue(0);
            setValidateNofi("");
        };
    }, [isOpen]);

    const onChangeQuantity = (event) => {
        let nquantity = event.target.value;
        if (nquantity == "" || nquantity <= 0) {
            setValidateNofi("数値は0より大きくなければなりません");
            setBuyEnable(false);
        } else if (nquantity > stock) {
            setValidateNofi(
                `在庫が残っている商品は${stock}のみです。これ以上購入することはできません`
            );
            setBuyEnable(false);
        } else {
            setBuyEnable(true);
            setValidateNofi("");
            let sum = nquantity * price;
            if (discountPercent > 0)
                setDiscountValue(Math.round(sum * (discountPercent / 100)));
            setQuantity(nquantity);
            setTotal(sum);
        }
    };

    const onChangeCode = (event) => {
        setDiscountCode(event.target.value);
    };

    const onChangeDeliveryAddress = (event) => {
        setDeliveryAddress(event.target.value);
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
                <p
                    style={{
                        color: "red",
                        textAlign: "right",
                        marginRight: 25,
                    }}
                >
                    {validateNofi}
                </p>
                <DialogContent>
                    <div className="shopping-cart">
                        <div className="product-cart"></div>
                        <div className="product-cart">
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

                        <div className="product-cart">
                            <p
                                style={{
                                    color: "red",
                                    textAlign: "right",
                                    marginRight: 25,
                                }}
                            >
                                {errorMessage}
                            </p>
                            <div className="address-input-cart">
                                <h6>配送先住所</h6>
                                <input
                                    type="text"
                                    name="delivery-address"
                                    className="input-address"
                                    onChange={(event) =>
                                        onChangeDeliveryAddress(event)
                                    }
                                />
                            </div>
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
