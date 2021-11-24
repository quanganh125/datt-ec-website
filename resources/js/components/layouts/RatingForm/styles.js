import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
    root: {
        zIndex: 3,
        backgroundColor: "#f4f4f4",
        borderRadius: 10,
        paddingBottom: 10,
    },

    formContainer: {
        paddingLeft: 20,
        paddingRight: 20,
    },

    commentContainer: {},

    inputRate: {
        width: "100%",
    },

    rateContainer: {
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
    },

    submitContainer: {
        marginTop: 10,
        // alignItems: "center",
        // justifyContent: "center",
        // display: "flex",
    },

    submit: {
        width: 150,
        padding: 10,
        float: "right",
    },

    dialogaction: {
        fontWeight: "bold",
    },
}));
