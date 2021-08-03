import { useState } from "react";


export const useForm = (callback, initialState = {}) => {


    const [values, setValue] = useState(initialState)

    function onChange (e) {
        setValue({ ...values, [e.target.name]: e.target.value })
    }

    function onSubmit(e) {
        e.preventDefault();
        callback();
    }

    return {
        onChange,
        onSubmit,
        values
    }
}