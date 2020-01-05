import config from "../../config";
import {success, failure} from "../../libs/response-lib";

const mysql = require('serverless-mysql')({
    config: config.rdsMysqlConfig
});

exports.main = async event => {

    console.log('event : ', event);

    try {

        let crewId = 1;

        // Run your query
        let results = await mysql
            .query(`
                SELECT 
                    id, name, catchPhrase, contact, baseGeoPoint, logoImage, description, birthday 
                FROM 
                    Crew
                WHERE id = ${crewId};
                `)
            .catch(err => {
                throw err;
            });

        // Run clean up function
        await mysql.end();

        // Return the results
        console.log('results : ', results);

        let crew = results[0];

        return success(crew);

    } catch (e) {

        console.log(e);

        return failure(500, e);
    }
};