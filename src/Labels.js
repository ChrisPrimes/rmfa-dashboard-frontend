import React, { useState } from 'react';
import { Buffer } from 'buffer';
import Select from 'react-select';
import './App.css';

const Labels = () => {
    const [collectionNumberInput, setCollectionNumberInput] = useState('');
    const [bio1, setBio1] = useState('');
    const [bio2, setBio2] = useState('');
    const [error, setError] = useState(false);
    const [selectedReport, setSelectedReport] = useState(1);

    const apiFetch = async (url, body) => {
        const response = await fetch(url, {
            method: 'post',
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
            throw new Error('Error fetching data fron API.');
        }

        const text = await response.text();

        return Buffer.from(text, 'base64');
    }

    const printLabels = async () => {
        setError(false);

        let userInput = collectionNumberInput.trim().split(',');

        if (userInput.length === 1 && userInput[0] === '') {
            userInput = '-1'
        }

        let data;
        try {
            let reportParams = {
                collectionNumber: userInput,
                artBio: [bio2, bio1]
            };

            data = await apiFetch("http://localhost:8080/reports/" + selectedReport, reportParams);

        } catch (e) {
            setError("Error generating report. Check that your input is valid.");
            return;
        }

        const blob = new Blob([data], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        window.open(url);
    };

    const reportOptions = [
        { value: 'collectionAvery5160', label: 'Avery 5160 - 30 /sheet' },
        { value: 'collectionAvery5126', label: 'Avery 5126 - 2 /sheet' }
    ]


    return (
        <div>
            <h1>Collection Labels</h1>

            {error && <div className="error">{error}</div>}

            <div>Selected Report</div>
            <Select options={reportOptions}
                value={reportOptions.filter(obj => obj.value === selectedReport)}
                onChange={(e) => {
                    setSelectedReport(e.value);
                }}
                className="report-select" />

            <div>Collection Numbers</div>
            <textarea rows="5" cols="50" value={collectionNumberInput} onChange={(event) => setCollectionNumberInput(event.target.value)}>
            </textarea>

            {selectedReport === 'collectionAvery5126' &&
                <>
                    <div>Bio #1</div>
                    <textarea rows="10" cols="50" value={bio1} onChange={(event) => setBio1(event.target.value)}>
                    </textarea>

                    <div>Bio #2</div>
                    <textarea rows="10" cols="50" value={bio2} onChange={(event) => setBio2(event.target.value)}>
                    </textarea>
                </>
            }

            <button className="button" onClick={printLabels}>Generate</button>
        </div>
    );
}

export { Labels };