import React, { useState } from 'react';
import { Buffer } from 'buffer';
import './App.css';

const Labels = () => {
    const [collectionNumberInput, setCollectionNumberInput] = useState('');
    const [error, setError] = useState(false);

    const apiFetch = async (url) => {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Error fetching data fron API.');
        }

        const body = await response.text();

        return Buffer.from(body, 'base64');
    }

    const printLabels = async () => {
        setError(false);

        let userInput = collectionNumberInput.trim().split(',');

        if (userInput.length === 1 && userInput[0] === '') {
            userInput = '-1'
        }

        let data;
        try {
            data = await apiFetch("http://localhost:8080/reports/collectionAvery5160?collectionNumber=" + userInput);
        } catch (e) {
            setError("Error generating report. Check that your input is valid.");
            return;
        }

        const blob = new Blob([data], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        window.open(url);
    };


    return (
        <div>
            <h1>Collection Labels</h1>

            {error && <div className="error">{error}</div>}

            <textarea rows="10" cols="50" value={collectionNumberInput} onChange={(event) => setCollectionNumberInput(event.target.value)}>
            </textarea>

            <button className="button" onClick={printLabels}>Generate</button>
        </div>
    );
}

export { Labels };