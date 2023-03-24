import { useState } from "react";
import Button from "../Base/Button/Button";
import Input from "../Base/Input/Input";
import styles from "./SearchBar.module.css";
import { useHistory } from "react-router-dom";

function SearchBar({ onSubmit, error, loading, clearError }) {
    const [searchValue, setSearchValue] = useState('');
    let history = useHistory();

    const onInputChange = (e) => {
        if (error) {
            clearError()
        }
        setSearchValue(e.target.value)
    };

    return (
        <>
            <Input value={searchValue} onChange={onInputChange} />
            {error && <p className={styles.error}>{error}</p>}
            <Button text={loading ? 'Loading...' : 'Search'} onClick={() => { onSubmit(searchValue) }} loadingState={loading} />
            <Button text="Favorite" onClick={() => { history.push("/favorites"); }} />
        </>
    )
}

export default SearchBar;