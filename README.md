s3-angular-file-upload
======================

Example of S3 file upload using ng-file-upload, angular, node and aws-sdk.

##### Demo
Coming soon.

##### Technology Stack
Server

Nodejs as a backend server.
Expressjs as a wrapper on HTTP for nodejs to process.
AWS-SDK for talking with the Amazon server

Frontend

AngularJS for frontend modularity and one page app.
ng-file-upload for multipart file uploads to S3
Testing

Jasmine tests run through karma on the frontend.
Mocha tests run through grunt for the backend.

##### Getting started

1. Install Nodejs
    Use installer http://nodejs.org/
    Or use macports sudo port install nodejs
    Or use Homebrew brew install node
2. Run the following commands in the terminal
    ```
    node -v
    npm -v
    ```
    Make sure both the above commands were valid and printed out node and npm versions.
    Set user account as owner of the /usr/local sudo chown -R $USER /usr/local
3. Clone the repo and cd into the directory where repo is cloned.
4. Run the following commands
```
npm install -g yo bower generator-angular-fullstack 
npm install
bower install
```
5. In the file lib/config/aws.json enter your AWS credentials.
6. Open your AWS account and go to the management console.
7. Click on S3
8. Create a new S3 bucket called 'mybucket-dev'
9. Change the permissions of this bucket by clicking the properties tab under 'mybucket-dev'
10. Click 'Add more permissions'.
11. Under Grentee list Everyone and check list and upload/delete.
12. Then click 'Add CORS configurgation'.
13. Copy following into the configuration
      ```
        <?xml version="1.0" encoding="UTF-8"?>
          <CORSConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
              <CORSRule>
                  <AllowedOrigin>*</AllowedOrigin>
                  <AllowedMethod>GET</AllowedMethod>
                  <AllowedMethod>POST</AllowedMethod>
                  <AllowedMethod>PUT</AllowedMethod>
                  <AllowedHeader>*</AllowedHeader>
              </CORSRule>
          </CORSConfiguration>
      ```
14. Save the configuration.


##### Now you are ready to run your server and upload some files.
1. ```grunt serve```
2. The above command should open the browser.
3. If the browser doesn't open on its own, you can browse to ```http://localhost:9000/```

##### Testing
To run the tests simply run
```
grunt test
```









