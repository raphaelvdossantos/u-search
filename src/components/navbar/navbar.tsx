import { useContext } from "react";
import Button from "src/atoms/buttons/button";
import { DataContext } from "src/context/DataContext";
import Search from "../search/search";
import { Bar } from "./styled";

function NavBar() {
    const {
        State: { pagination },
        Actions: { nextPage, previousPage, lastPage, firstPage, goToPage, setSearchTerm, search },
    } = useContext(DataContext);

    const pages = Array.from({ length: 9 }, (_, idx) => idx + pagination.currentPage)
    const handleSetSearchTerm = (event: React.ChangeEvent<HTMLInputElement>) => {
        const term = event.target.value
        setSearchTerm(term);
    }

    return (
        <Bar>
            <div>
                {pagination.currentPage > 1 && (
                    <>
                        <Button onClick={firstPage} type="first" pagination />
                        <Button onClick={previousPage} type="previous" pagination />
                    </>
                )}
                {pages.length &&
                    pages.map((_, index) => (
                        <Button
                            onClick={() => goToPage(pagination.currentPage + index)}
                            text={(pagination.currentPage + index).toString()}
                        />
                    ))}
                {pagination.nextPage && (
                    <>
                        <span> ...</span>
                        <Button onClick={nextPage} type="next" pagination />
                        <Button onClick={lastPage} type="last" pagination />
                    </>
                )}
            </ div>
            <Search onChange={handleSetSearchTerm} onClick={() => search()} />
        </Bar>
    );
}

export default NavBar;
