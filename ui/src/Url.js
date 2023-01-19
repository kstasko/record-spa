import React from "react";
const https = require('https');
import './App.css';

const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
});

const lookup =   (url) => {
    return url;
    /* TODO make async, do oauth flow(?), trigger microservices */
}

export const Url = () => {
    const [url, setUrl] = React.useState('');
    const [fetched, setFetched] = React.useState(false);
    return (<div>
        <p>
            <label style={{fontSize: "22px"}}htmlFor="url">Record</label>
        </p>
        <p><input type="text" id="url" value={url} onChange={(event) => { setUrl(event.target.value) }} /></p>
        <button type="button" onClick={() => setFetched(lookup(url))}>Look up my record!</button>
        <p style={{fontSize: "22px"}}>Fetched: {fetched}</p>

    </div>)
}