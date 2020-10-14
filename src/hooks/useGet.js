import { useState, useEffect, useRef } from "react";

export const useGetWithToken = (url) => {

    const [state, setState] = useState({ data: null, loading: true, successful: false })

    // Using a ref to keep track of whether the component is still on the screen by the time the fetch request comes back. Tried to use state but it didn't work. Maybe you can't set state while unmounting...? Also setting state triggers a re-render of the component which would trigger another fetch request... not a good idea! Updating a ref won't re-render the component.

    // Doing this will stop the memory leak error where React is trying to update the state on an unmounted compoennt.
    const componentMounted = useRef(true);

    const token = window.localStorage.getItem("token")

    useEffect(() => {
        const callFetch = async () => {
            const response = await fetch(url, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `token ${token}`
                },
            })
            const data = await response.json()

            /// you access the value of a ref with the .current property
            if (componentMounted.current) {
                setState({
                    successful: response.ok,
                    data: data,
                    loading: false
                });
            }
        }

        if (url.length > 0) {
            callFetch();
        }

        return () => {
            componentMounted.current = false;
        }
    }, [url]);

    return state;
}