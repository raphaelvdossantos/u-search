import { ReactNode, useState, createContext, useEffect } from "react";
import { AppState, AppStore, StoreActions } from "src/interfaces/store";
import { default as Actions } from "./actions";

export const DataContext = createContext({} as AppStore)

interface DataProvider {
    children: ReactNode
}

const initialState: AppState = {
    universities: [],
    paginatedUniversities: [],
    searchTerm: "",
    pagination: {
        currentPage: 1,
        nextPage: 2,
        previousPage: null
    }
}

export default function DataProvider({ children }: DataProvider) {

    const [State, setState] = useState(initialState);

    useEffect(() => {
        async function execute() {
            const data = await Actions.fetchData();
            const state = { ...State }
            state.universities = data;

            setState(state);
            Actions.paginate(state, setState)
        }

        execute();
    }, [State.searchTerm])

    useEffect(() => {
        Actions.paginate(State, setState)
    }, [State.pagination])

    const ProviderActions: StoreActions = {
        ...Actions,
        nextPage: () => Actions.nextPage(State, setState),
        previousPage: () => Actions.previousPage(State, setState),
        lastPage: () => Actions.lastPage(State, setState),
        firstPage: () => Actions.firstPage(State, setState),
        goToPage: (page: number) => Actions.goToPage(State, setState, page),
        setSearchTerm: (searchTerm: string) => Actions.setSearchTerm(State, setState, searchTerm),
        search: () => Actions.search(State, setState)
    }


    return (<DataContext.Provider value={{ State, Actions: ProviderActions }}>
        {children}
    </DataContext.Provider>)
}
