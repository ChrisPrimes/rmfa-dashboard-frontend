import React, { useState } from 'react';
import { Buffer } from 'buffer';
import Select from 'react-select';
import { saveAs } from 'file-saver';
import classNames from "classnames";

import { ApiService } from './service/ApiService';

const Labels = () => {
    const [collectionNumberInput, setCollectionNumberInput] = useState('');
    const [bio, setBio] = useState(['', '']);
    const [error, setError] = useState(false);
    const [selectedReport, setSelectedReport] = useState(false);

    const printLabels = async () => {
        setError(false);

        let userInput = collectionNumberInput.trim().split(',');

        if (userInput.length === 1 && userInput[0] === '') {
            userInput = ['-1']
        }

        let reportParams = {
            collectionNumber: userInput,
            artBio: bio
        };

        let data, report;
        try {
            data = await ApiService.post("http://localhost:8080/reports/" + selectedReport, reportParams, true);
            report = Buffer.from(data.report, 'base64')
        } catch (e) {
            console.error(e);
            setError("Error generating report. Check that your input is valid.");
            return;
        }

        const blob = new Blob([report], { type: 'application/pdf' });
        saveAs(blob, data.reportName + ".pdf");
    };

    const updateBio = (position, value) => {
        let newBio = [...bio];
        newBio[position] = value;
        setBio(newBio);
    }

    const reportOptions = [
        { value: 'collectionAvery5160', label: 'Avery 5160 - 30 per sheet' },
        { value: 'collectionAvery5126', label: 'Avery 5126 - 2 per sheet' }
    ]


    return (
        <div className="report-input mx-auto mt-3">
            <h2 className="mb-3">Collection Labels</h2>

            {error &&
                <div className="alert alert-warning alert-dismissible fade show" role="alert">
                    {error}
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            }

            <div className="mb-3">
                <label className="form-label">Selected Report</label>
                <Select options={reportOptions}
                    value={reportOptions.filter(obj => obj.value === selectedReport)}
                    onChange={(e) => {
                        setSelectedReport(e.value);

                    }} />
            </div>

            {selectedReport &&
                <div className="mb-3">
                    <label className="form-label">Collection Numbers</label>
                    <textarea className="form-control" rows="5" value={collectionNumberInput}
                        onChange={(event) => setCollectionNumberInput(event.target.value)}>
                    </textarea>
                </div>
            }

            {selectedReport === 'collectionAvery5126' &&
                <div className="row mb-3">
                    <div className="col">
                        <label className="form-label">Bio #1</label>
                        <textarea className="form-control" rows="10" value={bio[0]} onChange={(event) => updateBio(0, event.target.value)}>
                        </textarea>
                    </div>
                    <div className="col">
                        <label className="form-label">Bio #2</label>
                        <textarea className="form-control" rows="10" value={bio[1]} onChange={(event) => updateBio(1, event.target.value)}>
                        </textarea>
                    </div>

                </div>
            }

            <button className={classNames("btn", "btn-primary", "mb-3", {
                disabled: !selectedReport
            })} onClick={printLabels}>Generate</button>
        </div>
    );
}

export { Labels };