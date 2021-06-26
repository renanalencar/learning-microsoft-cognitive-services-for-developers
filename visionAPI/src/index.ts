import { Buffer } from 'buffer';
import * as fs from 'fs';
import * as querystring from 'querystring';
import request = require('request');

import { config } from './config';

// analyzeImage('dog.png');
// analyzeImage('obama.jpg', 'celebrities');
analyzeImage('people.jpg');

function analyzeImage(fileName: string, model?: string) {
    const requestOptions: request.CoreOptions = {
        headers: {
            "Content-Type": "application/octet-stream",
            "Ocp-Apim-Subscription-Key": config.apiKey1,
        },
        body: readImage(__dirname + "/" + fileName),
    };

    const params: any = {
        // "visualFeatures": "Categories,Description,Color",
        "visualFeatures": "Faces",
        "details": "",
        "language": "en",
    };

    let uri = "";

    if (model) {
        params.model = model;
        uri = config.endpoint + "/models/" + model + "/analyze?" + querystring.stringify(params);
    } else {
        uri = config.endpoint + "/analyze?" + querystring.stringify(params);
    }

    request.post(
        uri,
        requestOptions,
        (err, response, body) => {
            console.dir(response.body, { depth: null, colors: true });
        });
}

function readImage(filePath: string) {
    const fileData = fs.readFileSync(filePath).toString("hex");
    const result = [];
    for (let i = 0; i < fileData.length; i += 2) {
        result.push(parseInt(fileData[i] + "" + fileData[i + 1], 16));
    }
    return Buffer.from(result);
}