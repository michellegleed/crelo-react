import React, { useContext } from 'react';
import LoadingContext from './loadingContext.js';

const Spinner = () => {
    const { loadingCount } = useContext(LoadingContext)

    return (
        <>
            {loadingCount > 0 && (
                <h1>Loading The Stuff :)</h1>
            )}
        </>
    )
}

export default Spinner;