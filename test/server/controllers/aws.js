'use strict';

var aws = require(__dirname + '/../../../lib/controllers/aws.js'),
    aws_config = require(__dirname + '/../../../lib/config/aws.json'),
    assert = require('assert');

describe('controller', function () {
    var req,
        res,
        responseData;

    beforeEach(function() {
        req = {
            query: {
                mimeType : 'image/jpeg'
            }
        };
        res = {
            send: function (status, value) {
                responseData = value;
            }
        };
    });

    afterEach(function() {
    });
    describe('aws', function () {
        it('generates the correct s3 Policy', function () {
            var decodedBuf,
                parsedDecodedBuf;
            aws.getS3Policy(req, res);
            decodedBuf = new Buffer(responseData.s3Policy, 'base64').toString('utf-8');
            parsedDecodedBuf = JSON.parse(decodedBuf);
            assert.equal(parsedDecodedBuf.conditions[0][0], 'starts-with');
            assert.equal(parsedDecodedBuf.conditions[0][1], '$key');
            assert.equal(parsedDecodedBuf.conditions[0][2], 's3UploadExample/');

            assert.equal(parsedDecodedBuf.conditions[1].bucket, aws_config.bucket);

            assert.equal(parsedDecodedBuf.conditions[2].acl, 'public-read');

            assert.equal(parsedDecodedBuf.conditions[3][0], 'starts-with');
            assert.equal(parsedDecodedBuf.conditions[3][1], '$Content-Type');
            assert.equal(parsedDecodedBuf.conditions[3][2], req.query.mimeType);

            assert.equal(parsedDecodedBuf.conditions[4].success_action_status, '201');
        });
    });
});

