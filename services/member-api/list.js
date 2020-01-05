import {failure, success} from "../../libs/response-lib";
import config from "../../config";

const mysql = require('serverless-mysql')({
    config: config.rdsMysqlConfig
});

exports.main = async event => {

    console.log('event : ', event);

    try {

        // Run your query
        let results = await mysql
            .query(`
                SELECT 
                    *
                FROM 
                    Member;
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