import React from 'react';

export const Block = ({count}) => {
    return (
        <div id="block" value={count + 1}>
            <h1>Block - {count}</h1>
        </div>
    );
}
