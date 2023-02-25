import React, { useEffect, useState } from 'react';

import { ApiService } from './service/ApiService';

const List = () => {
    const [data, setData] = useState(false)

    useEffect(() => {
        ApiService.get(ApiService.serverRoot() + "/proxy/collectionList", true).then((res) => {
            setData(res);
        });
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
            <div className="collection-list">
                {data && renderList()}
            </div>

        </div>
    );
}

export { List };