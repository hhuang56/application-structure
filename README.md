# application-structure

This skeleton outlines the structure of an Express REST API interface with a Mongo DB.

General steps to create your application:

1. Create package.json: $npm init
2. Install dependencies: view this application's package.json's "dependencies" section and install using $npm install --save package-name
3. Create the bin directory and www.js file
4. Add the start-dev and start scripts to the "scripts" section in package.json
5. Create models directory and a model.js file for your Mongo model
6. Create a controllers directory and a services subdirectory
7. Create a controller for any potentially shared processes; in exampleController.js, image processing is handled
7. Create a data service file in the services subdirectory; this will be used to process database requests
8. Create a routes directory and a route.js file for your rest api
9. Create a public directory; create an img subdirectory as needed (if you are storing image file uploads, for example) and a js subdirectory as needed (if you are interfacing with client-side HTML or templates)
10. If you need to interface with HTML, create a client-side javascript file in your public/js directory