import { useContext } from "react";
import { DataContext } from "src/context/DataContext";
import { Content } from "./styled";


export default function Dashboard() {
    const { State: { paginatedUniversities } } = useContext(DataContext);
    return <Content>
        {paginatedUniversities.length ? paginatedUniversities.map(university => (<p>{university.name}</p>)) : <span> No results found </span>}
    </Content>
}