import React, {useState} from "react";
import {InputText} from "primereact/inputtext";

interface SearchProps {
    sourceOnChange: any;
    sourceStyle?: any;
    sourcePlaceholder?: string;
    sourceClassName?: string;
}

const SearchInput: React.FC<SearchProps> = ({
    sourceOnChange,
    sourceStyle={ width: "454px" },
    sourcePlaceholder="Buscar",
    sourceClassName="border-round-3xl",
}) => {

    const [inputValue, setInputValue] = useState('')
    const [timer, setTimer] = useState<any>(null)

    const inputChanged = (e:any) => {
        setInputValue(e.target.value)
        clearTimeout(timer)

        const newTimer = setTimeout(() => {
            sourceOnChange(e)
            // console.log('inputValue:', inputValue);
        }, 700)
        setTimer(newTimer)
    }

    return (
        <InputText
            value={inputValue}
            onChange={inputChanged}

            style={sourceStyle}
            placeholder={sourcePlaceholder}
            className={sourceClassName}
        />
    );
};

export default SearchInput;
