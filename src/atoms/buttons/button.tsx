import { Btn, Icon } from "./styled";

interface Props {
    onClick: () => void,
    text?: string,
    pagination?: boolean,
    type?: "next" | "previous" | "first" | "last"
    underlined?: boolean
}

export default function Button({ onClick, text, pagination = false, type }: Props) {
    function getPaginationText() {
        const icons = {
            next: ">",
            previous: "<",
            first: "<<",
            last: ">>"
        }

        return type ? icons[type] : null;
    }

    const content = pagination ? getPaginationText() : text;

    return <Btn onClick={onClick}><Icon>{content}</Icon></Btn>
}