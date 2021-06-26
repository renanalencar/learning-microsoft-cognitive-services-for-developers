import * as querystring from 'querystring';
import * as request from 'request';

import { config } from './config';

// fixSpellings("Hollo world!");
fixSpellings("Hollo world! This is a Hollo log.");

function fixSpellings(inputText: string) {
    const form = {
        "mkt": "en-US",
        "mode": "proof",
        "text": inputText,
    };

    const formData = querystring.stringify(form);

    const requestOptions: request.CoreOptions = {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Ocp-Apim-Subscription-Key": config.apiKey1,
            "Content-Length": formData.length,
        },
    }

    request.post(
        config.endPoint + "?" + formData,
        requestOptions,
        (err, response, body) => {
            console.dir(response.body, { depth: null, colors: true });
        }
    );
}