import React from 'react';
import Majax from 'react-mathjax';

export const changeValue = (event) => isNaN(parseFloat(event.target.value)) ? 0 : parseFloat(event.target.value);
export const setErrorValue = (...values) => {
    values.forEach(x => x = 0);
}
export const containsErrorValue = (...values) => {
    let containsError = false;
    values.forEach(x => {
        if (!isFinite(x)){
            containsError = true;
        }
    })

    return containsError;
}
export const setRes = (res, fixed, isError) => {
    isError = !isFinite(res);
    if (isError){
        return 0;
    }

    if (!fixed){
        return res.toFixed(fixed);
    }

    return res;
}
export const mathjaxNode = (formula) => {
    return <Majax.Node inline formula={formula} />
}