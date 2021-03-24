# Web Dev - Poi Assignment

### Description
_________
This Poi app allows users to upload information and photographs about 'Walking Places of Interest' in Waterford County, created as part of the HDip in Computer Science course at WIT.

Note: a precursor to this git repository is the repository _enterprise-web-dev-assign1_

--------
### Poi Core Features
* Sign up / login / logout
* Update User account settings
* Create / View / Delete Pois with follwing characteristics: Name, description, location, category supporting image upload / view and delete
* Public Galley

## Plugins and Frameworks Used

| Name | Function |
| ---- | ----|
| Hapi framework | Node.js framework |
|hapi/inert| static file and directory handler |
|hapi/cookie| plugin for cookies|
|hapi/vision| templates rendering support|
|hapi/joi| validation|
|boom| error messages|
|Dotenv| local storage of environmental variables|
| Handlebars| templating engine|
| UiKit | Front end framework|
| Fontawsome | Icon set |
|Mongoose| framework to interact with Mongo|
|Cloudinary| uploading and storage of images|

### .env file
The app initialises from a .env file to separate secrets from your source code.
Required in this .env file are cookie, mongoose and cloudinary details.

**Cookie**
* cookie_name=name
* cookie_password=your_secret_password

**Cloudinary**
 https://cloudinary.com/ link your app with the following details provided by Cloudinary

* name=cloundinary-account-name
* key=your-key
* secret=your-secret-key

**Mongoose**
* db=mongodb+srv://paste-your-database-link-here



