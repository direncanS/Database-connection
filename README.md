# Database-connection
Based on the current status of the project, the in-memory DB is to be replaced by a Connection to MongoDB to be replaced. Data that has so far been transferred as loose JSON objects will be transferred as Data models or schemas created with the help of Mongoose and through them replaced. 
FH Technikum Wien Web Frameworks exercise sheet 6
Exercise sheet 6 - database connection

Frame

Based on the current status of the project, the in-memory DB is to be replaced by a connection to MongoDB.
Data, which was previously transferred as loose JSON objects, is created as data models or schemas with the help of Mongoose and replaced by them.
An API service should be created so that the data models or schemas are not stored on the frontend/backend.
1. Creation of object schemas with Mongoose
1.1 - Creating the scheme for HighScore and HighScoreList
Create a model schema for reporting high scores. The scheme should be available on the frontend as well as on the backend to enable consistent data transfer from the client to the backend and on to the DB. A scheme is to be created for the HighScore list, which is based on the HighScore scheme. Extend the backend so that the schemas + data can be stored in their own collection in MongoDB.
1.2 - Creating the schema for user data
A separate scheme should be created for the processing of user data and made available on the client and server. Similar to the schemes for HighScore and HighScoreList, the user data should be stored in a separate collection in MongoDB.
