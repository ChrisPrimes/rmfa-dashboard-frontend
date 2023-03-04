import React, { useState, useEffect } from 'react';
import { Buffer } from 'buffer';
import Select from 'react-select';
import { saveAs } from 'file-saver';
import classNames from "classnames";

import { ApiService } from './service/ApiService';
import { InputButton } from './component/InputButton';
import { Wrapper } from './component/Wrapper'

const Labels = () => {
    const [collectionNumberInput, setCollectionNumberInput] = useState('');
    const [collectionNumberParsedInput, setCollectionNumberParsedInput] = useState([]);
    const [bio, setBio] = useState([]);
    const [error, setError] = useState(false);
    const [selectedReport, setSelectedReport] = useState(false);
    const [loading, setLoading] = useState(false);
    const [fileUpload, setFileUpload] = useState(false);
    const [printAll, setPrintAll] = useState(false);

    const printLabels = async () => {
        setError(false);
        setLoading(true);

        let userInput = collectionNumberInput.trim().split(',');

        if (userInput.length === 1 && userInput[0] === '' && !printAll) {
            setError("You must enter collection numbers or select <strong>generate entire collection</strong> if applicable for the selected report.");
            setLoading(false);
            return;
        }

        if (printAll) {
            userInput = ['-1']
        }

        let reportParams = {
            collectionNumber: userInput,
            artBio: bio,
            manualFile: fileUpload
        };

        let data, report;
        try {
            data = await ApiService.post(ApiService.serverRoot() + "/reports/" + selectedReport, reportParams, true);
            report = Buffer.from(data.report, 'base64')
        } catch (e) {
            console.error(e);
            setError("Error generating report. Check that your input is valid.");
            setLoading(false);
            return;
        }

        const blob = new Blob([report], { type: 'application/pdf' });
        saveAs(blob, data.reportName + ".pdf");
        setLoading(false);
    };

    const updateBio = (position, value) => {
        let newBio = [...bio];
        newBio[position] = value;
        setBio(newBio);
    }

    const readFile = async (event) => {
        const file = event.currentTarget.files[0];
        const buffer = await file.arrayBuffer();
        const byteArray = new Int8Array(buffer);

        const base64 = Buffer.from(byteArray).toString("base64");
        setFileUpload(base64);
    };

    const generateCollectionNumberLabel = (index) => {
        const label = collectionNumberParsedInput[index];
        if (label) {
            return <> - <span className="fw-bold text-primary">{label}</span></>;
        }
    };

    const reportOptions = [
        { value: 'collectionAvery5160', label: 'Avery 5160 - 30 per sheet' },
        { value: 'collectionAvery5160FileUpload', label: 'Avery 5160 - 30 per sheet (File upload)' },
        { value: 'collectionAvery5126', label: 'Avery 5126 - 2 per sheet' },
        { value: 'collectionAvery5168', label: 'Avery 5168 - 4 per sheet' }
    ]

    useEffect(() => {
        setCollectionNumberParsedInput(collectionNumberInput.trim().split(','));
    }, [collectionNumberInput])

    return (
        <Wrapper>
            <div className="report-input mx-auto mt-3">
                <h2 className="mb-3">Collection Labels</h2>

                {error &&
                    <div className="alert alert-warning alert-dismissible fade show" role="alert">
                        <span dangerouslySetInnerHTML={{ __html: error }} />
                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                }

                <div className="mb-3">
                    <label className="form-label">Selected Report</label>
                    <Select options={reportOptions}
                        value={reportOptions.filter(obj => obj.value === selectedReport)}
                        onChange={(e) => {
                            setSelectedReport(e.value);
                            setPrintAll(false);
                            setCollectionNumberInput('');
                            setError(false);
                        }} />
                </div>

                {['collectionAvery5160'].includes(selectedReport) &&
                    <>
                        <div className="mb-3">
                            <div className="form-check form-switch">
                                <input className="form-check-input" type="checkbox" role="switch" checked={printAll} onChange={() => {
                                    setPrintAll(!printAll);
                                    setCollectionNumberInput('');
                                }} />
                                <label className="form-check-label">Generate entire collection</label>
                            </div>
                        </div>
                    </>
                }

                {['collectionAvery5160', 'collectionAvery5126', 'collectionAvery5168'].includes(selectedReport) && !printAll &&
                    <div className="mb-3">
                        <label className="form-label">Collection Numbers</label>
                        <textarea className="form-control" rows="5" value={collectionNumberInput}
                            onChange={(event) => setCollectionNumberInput(event.target.value)}>
                        </textarea>
                        <small className="form-text text-muted">Enter a list of collection numbers, seperated by commas. Example: 101, 204</small>
                    </div>
                }

                {['collectionAvery5126', 'collectionAvery5168'].includes(selectedReport) &&
                    <div className="row mb-3">
                        <div className="col">
                            <label className="form-label">Bio #1 {generateCollectionNumberLabel(0)}</label>
                            <textarea className="form-control" rows="10" value={bio[0]} onChange={(event) => updateBio(0, event.target.value)}>
                            </textarea>
                        </div>
                        <div className="col">
                            <label className="form-label">Bio #2 {generateCollectionNumberLabel(1)}</label>
                            <textarea className="form-control" rows="10" value={bio[1]} onChange={(event) => updateBio(1, event.target.value)}>
                            </textarea>
                        </div>
                    </div>
                }

                {selectedReport === 'collectionAvery5168' &&
                    <>
                        <div className="row mb-3">
                            <div className="col">
                                <label className="form-label">Bio #3 {generateCollectionNumberLabel(2)}</label>
                                <textarea className="form-control" rows="10" value={bio[2]} onChange={(event) => updateBio(2, event.target.value)}>
                                </textarea>
                            </div>
                            <div className="col">
                                <label className="form-label">Bio #4 {generateCollectionNumberLabel(3)}</label>
                                <textarea className="form-control" rows="10" value={bio[3]} onChange={(event) => updateBio(3, event.target.value)}>
                                </textarea>
                            </div>
                        </div>
                    </>
                }

                {selectedReport === 'collectionAvery5160FileUpload' &&
                    <>
                        <div className="mb-3">
                            <a href="/Collection Avery 5160 Template.xlsx">Download Excel Template</a>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Collection File</label>
                            <input className="form-control" type="file"
                                onChange={(event) => {
                                    readFile(event)
                                }}
                                onClick={(event) => {
                                    event.target.value = null
                                }} />
                        </div>
                    </>
                }

                <InputButton className={classNames("btn", "btn-primary", "mb-3", {
                    disabled: !selectedReport
                })} onClick={printLabels}
                    loading={loading}>
                    Generate
                </InputButton>
            </div>
        </Wrapper>
    );
}

export { Labels };