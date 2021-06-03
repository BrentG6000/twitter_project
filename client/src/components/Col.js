import React from 'react'

/* This component sets the style for the Datatags. Here children is added as an
argument to Col so that all other component tags within <Col></Col> are set to the style choosen. */
const Col = ({ children, style, className }) => {
    return (
        <div className={`col ${className}`} style={style}>
            {children}
        </div>
    )
}

export default Col