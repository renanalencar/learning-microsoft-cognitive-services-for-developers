import * as querystring from 'querystring';
import * as request from 'request';

import { config } from './config';

// getSupportedLanguages();
translateText("This is some sample text.", "en", "de");

function getSupportedLanguages() {
    const requestOptions: request.CoreOptions = {
        headers: {
            "Ocp-Apim-Subscription-Key": config.apiKey1,
        }
    };

    request.get(
        config.endPoint + "/languages?api-version=3.0",
        requestOptions,
        (err, response, body) => {
            console.dir(response.body, { depth: null, colors: true });
        }
    );
}

function translateText(inputText: string, from: string, to: string) {
    const params = {
        "from": from,
        "to": to,
    };

    const paramData = querystring.stringify(params);

    const text = [{ text: inputText }];
    const textData = JSON.stringify(text);

    const requestOptions: request.CoreOptions = {
        headers: {
            "Ocp-Apim-Subscription-Key": config.apiKey1,
            "Ocp-Apim-Subscription-Region": "brazilsouth",
            "Content-Type": "application/json; charset=UTF-8",
            "Content-Length": textData.length,
        },
        body: textData,
    };

    const requestUri = config.endPoint + "/translate?api-version=3.0&" + paramData;

    request.post(
        requestUri,
        requestOptions,
        (err, response, body) => {
            console.dir(response.body, { depth: null, colors: true });
        }
    );
}
