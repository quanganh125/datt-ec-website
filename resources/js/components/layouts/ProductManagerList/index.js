import React from "react";
import { Grid, Button } from "@material-ui/core";
import Item from "./ProductIManagerItem";
import "./productManagerList.scss";

function ProductList({ currentItems }) {
    return (
        <div className="listContainer">
            <Grid container alignItems="stretch" spacing={1}>
                {currentItems &&
                    currentItems.map((data) => (
                        <Grid key={data.id} item xs={12} md={6}>
                            <Item data={data} />
                        </Grid>
                    ))}
            </Grid>
        </div>
    );
}

export default React.memo(ProductList);
