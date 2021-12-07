import React from "react";
import { Grid } from "@material-ui/core";
import Item from "./ProductItem";
import "./productList.scss";

export default function ProductList({ currentItems, type }) {
    return (
        <div className="listContainer">
            <Grid container alignItems="stretch" spacing={2}>
                {currentItems &&
                    currentItems.map((data) => (
                        <Grid
                            key={data.id}
                            item
                            xs={12}
                            sm={6}
                            md={type == "home" ? 3 : 6}
                        >
                            <Item data={data} />
                        </Grid>
                    ))}
            </Grid>
        </div>
    );
}
