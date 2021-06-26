import * as request from 'request';

import { config } from './config';

addCalendarAppointment();

function addCalendarAppointment() {
    const requestOptions: request.CoreOptions = {
        headers: {
            "Ocp-Apim-Subscription-Key": config.subscriptionKey,
        }
    };

    const requestURI = config.endPoint + "/apps/" + config.applicationId +
        "/slots/production/predict?" + "&verbose=true&query=" +
        'Add a calendar appointment';

    request.get(
        requestURI,
        requestOptions,
        (err, response, body) => {
            console.dir(response.body, { depth: null, colors: true });
        }
    );
}
