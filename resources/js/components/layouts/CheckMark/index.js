import React, { useState, useEffect } from "react";
import "./_checkmark.scss";

export default function CheckMark({ stateCopy, setStateCopy }) {
    const [isShow, setIsShow] = useState(false);
    const resetAnimation = () => {
        setIsShow(true);
        setTimeout(() => {
            setIsShow(false);
            setStateCopy(false);
        }, 1500);
    };

    useEffect(() => {
        stateCopy && resetAnimation();
        return () => {};
    }, [stateCopy]);

    return (
        <>
            {isShow && (
                <div className="success-checkmark">
                    <div className="check-icon">
                        <span className="icon-line line-tip"></span>
                        <span className="icon-line line-long"></span>
                        <div className="icon-circle"></div>
                        <div className="icon-fix"></div>
                    </div>
                </div>
            )}
        </>
    );
}
