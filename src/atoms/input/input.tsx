import { useCallback } from "react";
import { CustomInput } from "./styled"

interface Input {
    type: string,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    placeholder?: string
}

export function Input(props: Input) {
    const { placeholder, type, onChange } = props;

    const executeChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => onChange(event), [])

    return <CustomInput placeholder={placeholder} type={type} onChange={executeChange} />
}