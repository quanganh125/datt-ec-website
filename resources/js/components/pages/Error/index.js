import { useState } from "react";
import storage from "../../services/firebaseConfig";

export default function Error() {
    return (
        <div
            className="error"
            style={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <h3>Page not found</h3>
        </div>
    );
}
