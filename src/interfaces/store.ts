import { University } from "./university"

export interface AppStore {
    State: AppState
    Actions: StoreActions
}

export interface StoreActions {
    paginate: (state: AppState, dispatch: React.Dispatch<React.SetStateAction<AppState>>, itemsByPage?: number) => void,
    fetchData: () => Promise<University[]>,
    nextPage: () => void
    previousPage: () => void,
    lastPage: () => void,
    firstPage: () => void,
    goToPage: (page: number) => void,
    setSearchTerm: (searchTerm: string) => void,
    search: () => void
}

export interface Pagination {
    currentPage: number,
    nextPage: number | null,
    previousPage: number | null
}

export interface AppState {
    universities: University[],
    paginatedUniversities: University[],
    searchTerm: string,
    pagination: Pagination
}
