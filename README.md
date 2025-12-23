I have developed a backend using Node.js. The main entry point is server.js, which is responsible for running the server, managing the database connection, and handling routing.

I have organized the project with the following folders: controller, model, routes, middleware, uploads,and utils.
In the model folder, I have implemented schema designs for User and Post.


In the user controller, I have implemented methods for user CRUD, registration, and login with JWT. In the registration method, I have used regular expressions to validate email, password, and mobile number.


In the post controller, I have implemented CRUD operations for posts and applied authentication middleware for create, update and delete methods, I have added a condition to ensure that only the owner of a post can modify or delete it.


In the middleware folder, I have implemented token validation, which is used in post routes for create, update, and delete operations.
In the routes folder, I have implemented routes for users and posts.
In the utils folder, I have implemented an uploadImage method using Multer.
I have added the port, database URL, and JWT secret key in a .env file.
For coding conventions, I have used snake_case for file names and camelCase for method names.
