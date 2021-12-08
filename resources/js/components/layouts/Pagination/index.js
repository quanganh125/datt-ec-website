import React, { useEffect, useState } from "react";
import ProductList from "../ProductList";
import ProductManagerList from "../ProductManagerList";
import VoteList from "../VoteList";
import ReactPaginate from "react-paginate";
import "./pagination.scss";

export default function Pagination({ dataItems, itemsPerPage, type }) {
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        if (dataItems.length > 0) {
            setCurrentItems(dataItems.slice(itemOffset, endOffset));
            setPageCount(Math.ceil(dataItems.length / itemsPerPage));
        }
    }, [itemOffset, itemsPerPage, dataItems]);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % dataItems.length;
        setItemOffset(newOffset);
    };

    function Items({ type }) {
        if (type == "home-product") {
            return <ProductList currentItems={currentItems} type={"home"} />;
        } else if (type == "manager-product") {
            return <ProductManagerList currentItems={currentItems} />;
        } else if (type == "vote-product") {
            return <VoteList currentItems={currentItems} />;
        }
    }

    return (
        <>
            <Items type={type} />
            <div className="paginate">
                <ReactPaginate
                    nextLabel="次に >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel="< 以前"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                />
            </div>
        </>
    );
}
