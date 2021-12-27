import React, { Component } from "react";
import "./sideBar.scss";
import { apiCategory } from "../../constant";

class SideBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category: "",
            sort_option: "",
            is_discount_selected: "",
            min_price: "",
            max_price: "",
            categories: [],
            validateNofi: "",
        };
    }

    isPositiveInteger = (number) => {
        return /^\+?\d+$/.test(number);
    };

    handleSubmit = () => {
        if (
            this.state.min_price &&
            !this.isPositiveInteger(this.state.min_price)
        ) {
            this.setState({
                validateNofi: "最小値を正の数で入力してください",
            });
        } else if (
            this.state.max_price &&
            !this.isPositiveInteger(this.state.max_price)
        ) {
            this.setState({
                validateNofi: "最大値を正の数で入力してください",
            });
        } else if (
            this.state.min_price &&
            this.state.max_price &&
            Number(this.state.max_price) <= Number(this.state.min_price)
        ) {
            this.setState({
                validateNofi: "最小値よりも大きい最大値を入力してください",
            });
        } else {
            this.setState({
                validateNofi: "",
            });
            this.props.onFilterSubmit(this.state);
        }
    };

    handleCategoryChange = (event) => {
        this.setState({
            category: event.target.value,
        });
    };

    handleSortOptionChange = (event) => {
        this.setState({
            sort_option: event.target.value,
        });
    };

    handleDiscountOptionChange = (event) => {
        this.setState({
            is_discount_selected: event.target.value,
        });
    };

    handleMinPriceChange = (event) => {
        this.setState({
            min_price: event.target.value,
        });
    };

    handleMaxPriceChange = (event) => {
        this.setState({
            max_price: event.target.value,
        });
    };

    fetchCategory = async () => {
        await axios
            .get(`${apiCategory}`)
            .then((res) => {
                const dataCategories = res.data.data;
                this.setState({
                    categories: dataCategories,
                });
            })
            .catch((error) => {
                console.error(error);
            });
    };

    componentDidMount() {
        this.fetchCategory();
    }

    render() {
        return (
            <div id="sideBarContainer">
                <div className="advance-search">
                    <span className="desc">検索フィルター</span>
                    <div className="row">
                        <div className="col-md-6 input-field">
                            <div className="input-select">
                                <select
                                    className="form-control"
                                    value={this.state.sort_option}
                                    onChange={this.handleSortOptionChange}
                                >
                                    <option value="">並べ替え</option>
                                    <option value="1">高価格</option>
                                    <option value="2">低価格</option>
                                    <option value="3">人気</option>
                                    <option value="4">最新</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-6 input-field">
                            <div className="input-select">
                                <select
                                    className="form-control"
                                    value={this.state.category}
                                    onChange={this.handleCategoryChange}
                                >
                                    <option value="">カテゴリ別</option>
                                    {this.state.categories.map((category) => (
                                        <option
                                            key={category.id}
                                            value={category.id}
                                        >
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="row second">
                        <div className="col-md-3 input-field">
                            <div className="input-select">
                                <input
                                    className="form-control"
                                    type="text"
                                    data-trigger=""
                                    placeholder="から"
                                    value={this.state.min_price}
                                    onChange={this.handleMinPriceChange}
                                />
                            </div>
                        </div>
                        <div className="col-md-3 input-field">
                            <div className="input-select">
                                <input
                                    className="form-control"
                                    type="text"
                                    data-trigger=""
                                    placeholder="まで"
                                    value={this.state.max_price}
                                    onChange={this.handleMaxPriceChange}
                                />
                            </div>
                        </div>

                        <div className="col-md-3 input-field">
                            <div className="input-select">
                                <select
                                    className="form-control"
                                    value={this.state.is_discount_selected}
                                    onChange={this.handleDiscountOptionChange}
                                >
                                    <option value="">すべて商品</option>
                                    <option value="1">割引のみ</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-3 input-field">
                            <div className="input-select">
                                <input
                                    id="submit"
                                    className="btn btn-primary"
                                    type="submit"
                                    value="申し込み"
                                    onClick={this.handleSubmit}
                                />
                            </div>
                        </div>
                    </div>
                    {this.state.validateNofi != "" ? (
                        <span className="validate-nofication">
                            {this.state.validateNofi}
                        </span>
                    ) : null}
                </div>
            </div>
        );
    }
}

export default SideBar;
