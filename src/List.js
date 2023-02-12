import React, { useEffect, useState } from 'react';
import './App.css';

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
            list.push(<p key={element.id}>{element.collection_number}. {element.artist}, <span class="italic">{element.title}</span>, {element.art_medium}</p>)
        });

        return list;
    };

    return (
        <div>
            {data && renderList()}
        </div>
    );
}

export {List};