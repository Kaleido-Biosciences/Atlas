'use strict';
var AWS = require("aws-sdk");
var sns = new AWS.SNS();

exports.handler = (event, context, callback) => {

    event.Records.forEach((record) => {
        console.log('Stream record: ', JSON.stringify(record, null, 2));
        console.log('eventType', record.eventName);
        var image = record.dynamodb.NewImage?record.dynamodb.NewImage:record.dynamodb.OldImage;

        var experiment = image.experiment && image.experiment.S?JSON.stringify(image.experiment.S):'';
        var status = image.experiment && image.experiment.S?JSON.stringify(image.status.S):'';
        var plateMaps = image.plateMaps && image.plateMaps.S?JSON.stringify(image.plateMaps.S):'';
        // var data = image.data && image.data.S?JSON.stringify(image.data.S):'';
        var params = {
            Subject: record.eventName + ":" + experiment,
            Message: '{ experiment: ' + experiment + ',\n   status: ' + status  + ',\n   plateMaps: ' + plateMaps + '}\n\n ',
            TopicArn: 'arn:aws:sns:us-east-1:001507046168:plateMapSetUpTopics'
        };

        sns.publish(params, function(err, data) {
            if (err) {
                console.error("Unable to send message. Error JSON:", JSON.stringify(err, null, 2));
            } else {
                console.log("Results from sending message: ", JSON.stringify(data, null, 2));
            }
        });
    });
    callback(null, `Successfully processed ${event.Records.length} records.`);
};