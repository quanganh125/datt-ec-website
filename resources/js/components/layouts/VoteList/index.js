import React from "react";
import { Grid } from "@material-ui/core";
import VoteItem from "./VoteItem";

export default function VoteList({ currentItems }) {
    console.log("data", currentItems);
    return (
        <>
            {currentItems &&
                currentItems.map((data) => (
                    <Grid key={data.id}>
                        <VoteItem data={data} />
                    </Grid>
                ))}
        </>
    );
}
