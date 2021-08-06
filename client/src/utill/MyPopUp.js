import React from 'react'
import { Popup } from 'semantic-ui-react';

function MyPopUp({content, childern}) {
    return (
        <Popup content={content} inverted trigger={childern} />
    )
}

export default MyPopUp
