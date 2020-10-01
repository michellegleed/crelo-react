import React, { useState } from 'react';
import LoadingContext from './loadingContext';

function LoadingProvider ({ children }) { 

    // Adds to loading count - we will do this whenever we start an async request
    const showLoading = () => {
        toggleLoading(prevState => {
            return {
                ...prevState,
                loadingCount: prevState.loadingCount + 1
            }
        })
    }

    // Removes from loading count - we will do this whenever an async request finishes
    const hideLoading = () => {
        toggleLoading(prevState => {
            return {
                ...prevState,
                loadingCount:
                    prevState.loadingCount > 0 ? prevState.loadingCount - 1 : 0
            }
        })
    }

    const loadingState = {
        loadingCount: 0,
        showLoading,
        hideLoading
    }

    // note that we are using toggleLoading in the show/hide loading functions above!
    const [loading, toggleLoading] = useState(loadingState);

    return (
        <LoadingContext.Provider value={loading}>
            {children}
        </LoadingContext.Provider>
    )
}

export default LoadingProvider;