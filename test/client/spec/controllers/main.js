'use strict';

describe('Controller: MainCtrl', function () {

    // load the controller's module
    beforeEach(module('s3UploadApp'));
    var $httpBackend,
        $rootScope,
        $location,
        createController;

    // Initialize the controller and a mock scope
    beforeEach(inject(function($injector) {
        $httpBackend = $injector.get('$httpBackend');

        //TODO: Add back when auth is working
        //$httpBackend.when('GET', '/auth.py').respond({userId: 'userX'}, {'A-Token': 'xxx'});
        $rootScope = $injector.get('$rootScope');
        $location = $injector.get('$location');
        var $controller = $injector.get('$controller');
        createController = function() {
            return $controller('MainCtrl', {'$scope' : $rootScope });
        };

    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should get Policy for one file', function () {
        var files = [
            {
                type: 'image/jpeg',
                name: 'abc.jpeg'
            }
        ];

        createController();

        $httpBackend.expectGET('/api/s3Policy?mimeType='+ files[0].type)
            .respond({
                s3Policy: 'base64Policy',
                s3Signature: 'signature',
                AWSAccessKeyId: 'config.accessKeyId'
            });

        $rootScope.onFileSelect(files);

        $httpBackend.expectPOST('https://mybucket-dev.s3.amazonaws.com/')
            .respond(201,
            '<?xml version="1.0" encoding="UTF-8"?>'+
            '<PostResponse>'+
                '<Location>https://mybucket-dev.s3.amazonaws.com/clubs%2Fimages%2Fpic+copy+3.jpg</Location>'+
                '<Bucket>mybucket-dev</Bucket>'+
                '<Key>clubs/images/pic copy 3.jpg</Key>'+
                '<ETag>"971d696d8ef20fbe43387c817f83dc52"</ETag>'+
            '</PostResponse>'
        );
        $httpBackend.flush();
    });

    it('should get Policy for multiple files', function () {
        var files = [
            {
                type: 'image/jpeg',
                name: 'abc.jpeg'
            },
            {
                type: 'image/bmp',
                name: 'xyz.bmp'
            }
        ];

        createController();
        files.forEach(function (file) {
            $httpBackend.expectGET('/api/s3Policy?mimeType='+ file.type)
                .respond({
                    s3Policy: 'base64Policy',
                    s3Signature: 'signature',
                    AWSAccessKeyId: 'config.accessKeyId'
                });
        });

        $rootScope.onFileSelect(files);

        files.forEach(function (file) {
            $httpBackend.expectPOST('https://mybucket-dev.s3.amazonaws.com/')
                .respond(201,
                    '<?xml version="1.0" encoding="UTF-8"?>'+
                    '<PostResponse>'+
                        '<Location>https://mybucket-dev.s3.amazonaws.com/clubs%2Fimages%2Fpic+copy+3.jpg</Location>'+
                        '<Bucket>mybucket-dev</Bucket>'+
                        '<Key>clubs/images/' + file.name + '</Key>'+
                        '<ETag>"971d696d8ef20fbe43387c817f83dc52"</ETag>'+
                    '</PostResponse>');
        });

        $httpBackend.flush();
    });

    describe('Progress and Abort', function () {
        beforeEach(function () {
            var files = [
                {
                    type: 'image/jpeg',
                    name: 'abc.jpeg'
                },
                {
                    type: 'image/bmp',
                    name: 'xyz.bmp'
                }
            ];

            createController();
            files.forEach(function (file) {
                $httpBackend.expectGET('/api/s3Policy?mimeType='+ file.type)
                    .respond({
                        s3Policy: 'base64Policy',
                        s3Signature: 'signature',
                        AWSAccessKeyId: 'config.accessKeyId'
                    });
            });

            $rootScope.onFileSelect(files);

            files.forEach(function (file) {
                $httpBackend.expectPOST('https://mybucket-dev.s3.amazonaws.com/')
                    .respond(201,
                        '<?xml version="1.0" encoding="UTF-8"?>'+
                        '<PostResponse>'+
                            '<Location>https://mybucket-dev.s3.amazonaws.com/clubs%2Fimages%2Fpic+copy+3.jpg</Location>'+
                            '<Bucket>mybucket-dev</Bucket>'+
                            '<Key>clubs/images/' + file.name + '</Key>'+
                            '<ETag>"971d696d8ef20fbe43387c817f83dc52"</ETag>'+
                        '</PostResponse>');
            });

        });
        it('should update the progress bar', function () {

            expect($rootScope.files[0].progress).toBe(0);
            expect($rootScope.files[1].progress).toBe(0);

            $httpBackend.flush();

            expect($rootScope.files[0].progress).toBe(100);
            expect($rootScope.files[1].progress).toBe(100);
        });

        it('should allow aborting existing downloads', function () {
            expect($rootScope.abort).toBeDefined();

            $httpBackend.flush();

            expect($rootScope.upload.length).toBe(2);
            expect($rootScope.upload[0].abort).toBeDefined();
            expect($rootScope.upload[1].abort).toBeDefined();
        });

    });

});
