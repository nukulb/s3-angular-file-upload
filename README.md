s3-angular-file-upload
======================

Example of S3 file upload using [ng-file-upload](https://github.com/danialfarid/angular-file-upload), angular and node.

##### Demo
Coming soon.

##### Technology Stack
###### Server

Nodejs as a backend server.
Expressjs as a wrapper on HTTP for nodejs to process.

###### Frontend

AngularJS for frontend modularity and one page app.
ng-file-upload for multipart file uploads to S3

###### Testing

Jasmine tests run through karma on the frontend.
Mocha tests run through grunt for the backend.

##### Getting started

1. Install Nodejs
    1. Use installer http://nodejs.org/
    2. Or use macports sudo port install nodejs
    3. Or use Homebrew brew install node
2. Run the following commands in the terminal
    ```
    node -v
    npm -v
    ```
Make sure both the above commands were valid and printed out node and npm versions.
3. Set user account as owner of the ```/usr/local sudo chown -R $USER /usr/local```
4. Clone the repo and cd into the directory where repo is cloned.
5. Run the following commands
```
npm install -g yo bower generator-angular-fullstack
npm install
bower install
```
6. In the file lib/config/aws.json enter your AWS credentials.
7. Open your AWS account and go to the management console.
8. Click on S3
9. Create a new S3 bucket, for example purposes lets say 'mybucket-dev'. You will need a unique name.
10. Change the permissions of this bucket by clicking the properties tab under 'mybucket-dev'
11. Click 'Add more permissions'.
12. Under Grentee list Everyone and check list and upload/delete.
13. Then click 'Add CORS configurgation'.
14. Copy following into the configuration
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
15. Save the configuration.
16. Save the bucket name that you just created in the lib/config/aws.json



##### Now you are ready to run your server and upload some files.
1. To launch the server ```grunt serve```
2. If the browser doesn't open on its own, you can browse to ```http://localhost:9000/```

##### Testing
To run the tests simply run ```grunt test```










