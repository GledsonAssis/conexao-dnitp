/*
 * React currently throws a warning when using useLayoutEffect on the server.
 * To get around it, we can lazily show component with useLayoutEffect.
 * Ref: https://gist.github.com/gaearon/e7d97cdf38a2907924ea12e4ebdf3c85
 */
import React, { useState, useEffect } from 'react'
import ReactInputMask from "react-input-mask";

const InputMask = props => {

    const [showChild, setShowChild] = useState(false);

    useEffect(() => {
        setShowChild(true);
    }, []);

    if (!showChild) {
        return null;
    }

    return (
        <ReactInputMask {...props} />
    )
}

export default InputMask;
