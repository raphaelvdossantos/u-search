import React from "react";
import { AppState } from "src/interfaces/store";
import { University } from "src/interfaces/university";
import { default as apiResponseMock } from 'src/mocks/apiResponse.json'


function paginate(state: AppState, dispatch: React.Dispatch<React.SetStateAction<AppState>>, itemsByPage: number = 10) {
    const { universities, pagination } = state;

    const paginationEnd = pagination.currentPage * itemsByPage;
    const paginationStart = paginationEnd - itemsByPage;
    const page = universities.filter((_, index) => index >= paginationStart && index < paginationEnd);



    dispatch({
        ...state,
        paginatedUniversities: page
    });
}

function nextPage(state: AppState, dispatch: React.Dispatch<React.SetStateAction<AppState>>) {
    const { pagination: { currentPage } } = state;

    const newPagination = {
        previousPage: currentPage,
        currentPage: currentPage + 1,
        nextPage: currentPage + 2
    }

    dispatch({
        ...state,
        pagination: newPagination
    })
}

function lastPage(state: AppState, dispatch: React.Dispatch<React.SetStateAction<AppState>>) {
    const { universities } = state;
    const lastPage = Math.floor(universities.length / 10) + 1;


    dispatch({
        ...state,
        pagination: {
            previousPage: lastPage - 1,
            currentPage: lastPage,
            nextPage: null
        }
    })
}

function previousPage(state: AppState, dispatch: React.Dispatch<React.SetStateAction<AppState>>) {
    const { pagination: { currentPage } } = state;

    let newPreviousPage = currentPage > 2 ? currentPage - 2 : null;

    const newPagination = {
        nextPage: currentPage,
        currentPage: currentPage - 1,
        previousPage: newPreviousPage,
    }

    dispatch({
        ...state,
        pagination: newPagination
    })
}

function firstPage(state: AppState, dispatch: React.Dispatch<React.SetStateAction<AppState>>) {
    dispatch({
        ...state,
        pagination: {
            previousPage: null,
            currentPage: 1,
            nextPage: 2
        }
    })
}

function goToPage(state: AppState, dispatch: React.Dispatch<React.SetStateAction<AppState>>, page: number) {
    const isFirstPage = page === 1;
    const isLastPage = page === Math.floor(state.universities.length / 10) + 1;

    const newPreviousPage = !isFirstPage ? page - 1 : null;
    const newNextPage = !isLastPage ? page + 1 : null;

    dispatch({
        ...state,
        pagination: {
            previousPage: newPreviousPage,
            currentPage: page,
            nextPage: newNextPage
        }
    })
}

function setSearchTerm(state: AppState, dispatch: React.Dispatch<React.SetStateAction<AppState>>, searchTerm: string) {

    dispatch({
        ...state,
        searchTerm
    })
}

async function search(state: AppState, dispatch: React.Dispatch<React.SetStateAction<AppState>>) {
    const URL = `${process.env.REACT_APP_API_URL}?name_contains=${state.searchTerm}`
    const response = await fetch(URL);
    const data = await response.json();

    const newState = {
        ...state,
        universities: data
    }

    paginate(newState, dispatch)
}


async function fetchData(): Promise<University[]> {
    const response = await fetch(process.env.REACT_APP_API_URL!);
    const data = await response.json();

    return data;
}

export default {
    paginate,
    fetchData,
    nextPage,
    lastPage,
    previousPage,
    firstPage,
    goToPage,
    setSearchTerm,
    search
}