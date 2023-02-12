import React, { useState } from 'react';
import { Buffer } from 'buffer';
import './App.css';

const Labels = () => {
    const [collectionNumberInput, setCollectionNumberInput] = useState('');

    const apiFetch = async (url) => {
        const response = await fetch(url);
        const body = await response.text();

        return Buffer.from(body, 'base64');
    }

    const printLabels = async () => {
        let userInput = collectionNumberInput.trim();
        if(userInput === '') {
            userInput = '-1'
        }

        const data = await apiFetch("http://localhost:8080/reports/collectionAvery5160?collectionNumber=" + userInput)

        const blob = new Blob([data], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        window.open(url);
    };


    return (
        <div>
            <h1>Collection Labels</h1>

            <textarea rows="10" cols="50" value={collectionNumberInput} onChange={(event) => setCollectionNumberInput(event.target.value)}>
            </textarea>

            <button className="button" onClick={printLabels}>Generate</button>
        </div>
    );
}

export { Labels };