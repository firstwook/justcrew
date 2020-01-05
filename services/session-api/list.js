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
                    * 
                FROM 
                    Session
                WHERE id = ${crewId};
                `)
            .catch(err => {
                return failure(500, err);
            });

        // Run clean up function
        await mysql.end();

        // Return the results
        console.log('results : ', results);

        return success(results);

    } catch (e) {
        return failure({status: false});
    }
};