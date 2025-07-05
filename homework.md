create a repository
initialize the repository
node module,package.json,package-lock.json
install express
create a server
listen to the port
write req handeller for /test , /hello
install nodemon and update script inside package.json
what are dependencies
what is usse of "-g" while npm npm install
difference btw caret and tilde



initialize git 
git ignore
create a remote repo on github
Push all code to remote origin
play with routes and extension ex. /hello
order the routes matter a lot
Install postman app make a workspace/collection > test api call
write logic to handle GET,POST,PATCH,DELETE, API calls and test them on Postman
Exploring routing and use of ?,+,(),* in the routes
use of regax in routes /a/   /.*fly$/
Reading the querry params in the routes
Reading the dynamic routes 


Multiple Route handelers - Play eith the code
next()
next function and errors along with res.send()
// app.use("/route",rH1, [rH3,rH4] ,rH5)
what is middleware?why do we need it?
how express js basically handles request behind the scenes 
app.use vs app.all
write a dummy auth middleware for admin 
write a dummy auth middleware for all routes ,except  /user/login
Error handeling using app.use("/",(err,req,res,next)=>{}) => allways write in the end


create a free cluster on Mongodb official websites(mongo db atlas)
install library 
connect your application with database "connection url/devTinder"
call the connectdb function and connect to the database before staring application on 7777
Create a userSchema & user Model
create post/signup API to add data to database 
Push some documents using API calls from postman
Error handeling using try , catch



js object vs json
Add express.json middleware to your app
Make your signup api dynamic to recieve data from the end user
user.findOne eith duplicate emailId , which object returs
API- GET user by emailId
API- Feed API - GET/feed - get all the user from the database
API - get user by id
create a delete user API
API - update a user
Explore mongoose documentation for model APIs
what are the options in a model.findOneAndUpdate method, explore more about it
API - update the user with emailId


explore  schematype options for the documentations
add required,unique,lowercase,min,minllength,trim
Add default 
Create a custom function for gender
Improve the DB schema - PUT all appropiate validations on each field in schema
