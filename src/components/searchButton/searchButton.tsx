import React from "react"
import { ReactComponent as SearchIcon } from "src/assets/icons/icons8-search.svg"
import { Btn } from "./styled"

interface SearchButton {
    onClick: () => void
}

export function SearchButton(props: SearchButton) {
    const { onClick } = props

    return <Btn onClick={onClick}><SearchIcon width={25} height={25} /></Btn>
}