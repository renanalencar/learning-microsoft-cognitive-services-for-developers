import { Buffer } from 'buffer';
import * as fs from 'fs';
import * as request from 'request';

import { config } from './config';

// convertSpeechToText('audio.wav');

convertTextToSpeech("This is a test of text to speech");

function convertTextToSpeech(inputText: string) {
    const authRequestOptions: request.CoreOptions = {
        headers: {
            "Ocp-Apim-Subscription-Key": config.apiKey1,
        }
    };

    request.post(
        config.endPoint,
        authRequestOptions,
        (err, response, body) => {
            const accessToken = response.body;
            // console.log(accessToken);
            const payLoad = `<speak version='1.0' xml:lang='en-US'>
            <voice xml:lang='en-US' xml:gender='Female' name='Microsoft Server Speech Text to Speech Voice (en-US, ZiraRUS)'>
            ${inputText}
            </voice>
            </speak>`;

            const requestOptions: request.CoreOptions = {
                headers: {
                    "X-Microsoft-OutputFormat": "riff-8khz-8bit-mono-mulaw",
                    "Content-Type": "application/ssml+xml",
                    "Host": "brazilsouth.tts.speech.microsoft.com",
                    "Content-Length": payLoad.length,
                    "Authorization": "Bearer " + accessToken,
                    "User-Agent": "NodeJS"
                },
                body: payLoad,
            };

            request.post(
                'https://brazilsouth.tts.speech.microsoft.com/cognitiveservices/v1',
                requestOptions,
                (err, response, body) => {
                    var convertedAudio = Buffer.from(response.body);
                    fs.writeFileSync(__dirname + "/output.wav", response.body,
                        { encoding: 'binary' });
                }
            );

        }
    )
}

function convertSpeechToText(fileName: string) {
    const requestOptions: request.CoreOptions = {
        headers: {
            "Content-Type": "audio/wav; codec=audio/pcm; samplerate=16000",
            "Transfer-Encoding": "chunked",
            "Ocp-Apim-Subscription-Key": config.apiKey1,
        },
        body: readBytes(__dirname + "/" + fileName),
    };

    request.post(
        config.speechToTextEndPoint,
        requestOptions,
        (err, response, body) => {
            console.dir(response.body, { depth: null, colors: true });
        }
    );
}

function readBytes(filePath: string) {
    const fileData = fs.readFileSync(filePath).toString("hex");
    const result = [];
    for (let i = 0; i < fileData.length; i += 2) {
        result.push(parseInt(fileData[i] + "" + fileData[i + 1], 16))
    }
    return Buffer.from(result);
}