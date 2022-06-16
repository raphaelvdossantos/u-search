import { Input } from "src/atoms/input/input";
import { SearchButton } from "../searchButton/searchButton";
import { SearchBar } from "./styled";

interface Search {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    onClick: () => void
}

export default function Search(props: Search) {
    const { onChange, onClick } = props;

    return (<SearchBar>
        <Input type="text" placeholder="Search a University by name" onChange={onChange} /> <SearchButton onClick={onClick} />
    </SearchBar>);
}