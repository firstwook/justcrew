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
        let results = await mysql.transaction()
            .query(`
                SELECT 
                    id, name, catchPhrase, contact, baseGeoPoint, logoImage, description, birthday 
                FROM 
                    Crew
                WHERE id = ${crewId};
                `)
            .query((r) => {
                console.log('r : ', r);

                return [`
                SELECT 
                    id, name, catchPhrase, contact, baseGeoPoint, logoImage, description, birthday 
                FROM 
                    Crew
                WHERE id = ?;
                `, 0];

            }).query((r) => {
                console.log('r : ', r);

                return [`
                SELECT 
                    id, name, catchPhrase, contact
                FROM 
                    Crew
                WHERE id = ?;
                `, 1];

            }).rollback(e => {
                console.log('ee : ', e);
                throw e;
            }).commit();

        // Run clean up function
        await mysql.end();

        // Return the results
        console.log('results!! : ', results);

        return success(results);

    } catch (e) {
        return failure({status: false});
    }
};