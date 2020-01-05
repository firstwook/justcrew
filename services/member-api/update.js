import {failure, success} from "../../libs/response-lib";

exports.main = async event => {

    console.log('event : ', event);

    try {
        return success({success: true});
    } catch (e) {
        return failure({status: false});
    }
};