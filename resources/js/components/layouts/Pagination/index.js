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
        setCurrentItems(dataItems.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(dataItems.length / itemsPerPage));
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

// import React, { useEffect, useState } from "react";
// import ReactDOM from "react-dom";
// import ReactPaginate from "react-paginate";

// const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

// function Items({ currentItems }) {
//     return (
//         <>
//             {currentItems &&
//                 currentItems.map((item, index) => (
//                     <div key={index}>
//                         <h3>Item #{item}</h3>
//                     </div>
//                 ))}
//         </>
//     );
// }

// export default function PaginatedItems({ itemsPerPage }) {
//     const [currentItems, setCurrentItems] = useState(null);
//     const [pageCount, setPageCount] = useState(0);
//     const [itemOffset, setItemOffset] = useState(0);

//     useEffect(() => {
//         const endOffset = itemOffset + itemsPerPage;
//         setCurrentItems(items.slice(itemOffset, endOffset));
//         setPageCount(Math.ceil(items.length / itemsPerPage));
//     }, [itemOffset, itemsPerPage]);

//     // Invoke when user click to request another page.
//     const handlePageClick = (event) => {
//         const newOffset = (event.selected * itemsPerPage) % items.length;
//         setItemOffset(newOffset);
//     };

//     return (
//         <>
//             <Items currentItems={currentItems} />
//             <ReactPaginate
//                 breakLabel="..."
//                 nextLabel="next >"
//                 onPageChange={handlePageClick}
//                 pageRangeDisplayed={5}
//                 pageCount={pageCount}
//                 previousLabel="< previous"
//                 renderOnZeroPageCount={null}
//             />
//         </>
//     );
// }
