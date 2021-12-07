import React from "react";
import "./loading.scss";

export default function Loading() {
    return (
        <div className="loadingContainer">
            <div className="outer"></div>
            <div className="middle"></div>
            <div className="inner"></div>
        </div>
    );
}
