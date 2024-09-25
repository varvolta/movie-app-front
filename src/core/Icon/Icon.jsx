import React from 'react'
import * as icons from 'feather-icons-react';

const Icon = ({ name, ...props }) => {
    if (!name) return null

    const Feather = icons[name]

    return (
        <Feather {...props} />
    )
}

export default Icon