import pagenotfound from "../../../assets/images/pngwing.com.png";
import "./error.scss";

export default function Error() {
    return (
        <div
            className="error"
            style={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minWidth: 600,
            }}
        >
            <img
                src={pagenotfound}
                alt="pagenotfound"
                className="pagenotfound-img"
            />
        </div>
    );
}
