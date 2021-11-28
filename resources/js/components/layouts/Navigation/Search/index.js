import React, { useState, useRef } from "react";
import SearchIcon from "@material-ui/icons/Search";
import "./search.scss";
import { useDispatch } from "react-redux";
import { setSearchTittle } from "./../../../redux/actions/seachAction";

export default function Search() {
    const [inputVal, setInputVal] = useState("");
    const formRef = useRef(null);
    const dispatch = useDispatch();

    return (
        <div id="boxSearch" ref={formRef}>
            <input
                type="text"
                id="header-search"
                placeholder="製品を検索。。。"
                name="search"
                value={inputVal}
                onChange={(e) => {
                    const val = e.target.value;
                    setInputVal(val);
                    dispatch(setSearchTittle(val));
                }}
            />
            <button type="submit" id="button">
                <SearchIcon id="iconSearch" />
            </button>
        </div>
    );
}
