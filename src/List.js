import React, { useEffect, useState } from 'react';

const List = () => {
    const [data, setData] = useState(false)

    const apiFetch = async (url) => {
        const response = await fetch(url);
        const json = await response.json();
        setData(json);
    }

    useEffect(() => {
        apiFetch("https://www.rochestermfa.org/api/rmfa/v1/collection/list?collection_number=-1");
    }, []);

    const renderList = () => {
        let list = [];
        data.forEach(element => {
            list.push(<p key={element.id}>{element.collection_number}. {element.artist}, <span className="fst-italic">{element.title}</span>, {element.art_medium}</p>)
        });

        return list;
    };

    return (
        <div className="mt-3">
            <h2 className="mb-3">Collection List</h2>
            {data && renderList()}
        </div>
    );
}

export {List};