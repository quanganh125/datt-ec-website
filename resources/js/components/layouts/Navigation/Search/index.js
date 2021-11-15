import React, { useState, useRef } from "react";
import SearchIcon from "@material-ui/icons/Search";
import "./search.scss";

export default function Search() {
    const [inputVal, setInputVal] = useState("");
    const formRef = useRef(null);

    return (
        <div id="boxSearch" ref={formRef}>
            <input
                type="text"
                id="header-search"
                placeholder="Tìm kiếm sản phẩm"
                name="search"
                value={inputVal}
                onChange={(e) => {
                    const val = e.target.value;
                    setInputVal(val);
                    console.log(inputVal);
                }}
            />
            <button type="submit" id="button">
                <SearchIcon id="iconSearch" />
            </button>
        </div>
    );
}
