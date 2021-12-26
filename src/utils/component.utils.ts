import React, { SyntheticEvent } from "react";
import { merge } from 'lodash';

export function handleInput(
    event:SyntheticEvent<Element, Event>, 
    field: string,
    state: any, 
    setState: React.Dispatch<React.SetStateAction<any>>, 
    value?: any
) {
    event.preventDefault();
    const newState = merge({}, state);
    if (value) {
        newState[field] = value;
    } else {
        let target = event.target as HTMLInputElement
        newState[field] = target.value;
    }
    setState(newState);
}

export function areInputsFilled(
    inputs: object
) {
    return Object.values(inputs).every( (input) => input.length > 0);
}