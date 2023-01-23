import React from "react";
import './App.css';
import axios from 'axios';

const recordSpaApi = 'https://5n1w18zbs9.execute-api.us-east-2.amazonaws.com/prod/'; //TODO don't hardcode this value

const lookup = async (recordName, setFetched, setRecordData, userToken) => {
    try {
        const response = await axios.post(recordSpaApi, { recordName }, {headers: {authorization: `Bearer ${userToken}`}});
        setFetched(true);
        setRecordData(response.status);
    } catch (err) {
        console.log('err', err);
        setRecordData('An error occurred');
        setFetched(true);
    }
}

const displayResults = (fetched, recordData) => {
    return fetched ? <p style={{ fontSize: "22px" }}>Record info: {recordData}</p> : <React.Fragment />
}

export const RecordFetcher = ({userToken}) => {
    const [recordName, setRecordName] = React.useState('');
    const [recordData, setRecordData] = React.useState('');
    const [fetched, setFetched] = React.useState(false);
    console.log('userToken in record fetcher', userToken)
    return (
        <div>
            <p>
                <label style={{ fontSize: "22px" }} htmlFor="record">Record &nbsp;</label>
                <input type="text" id="record" value={recordName} onChange={(event) => { setRecordName(event.target.value) }} />
            </p>
            <button type="button" onClick={() => lookup(recordName, setFetched, setRecordData, userToken)}>Look up my record!</button>
            {displayResults(fetched, recordData)}
        </div>
        )
}