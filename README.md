# User Management System Guide

## What does it do?

### Backend Development

I've developed a CRUD API in Golang for a fictional user management system. The API has the following functionalities:
1. Create, Retrieve, Update, and Delete users by ID. The data to be stored and captured should includes: First Name, Surname, Email Address, Date of Birth.
2. Upload a file and associate it with a user, this should be a fictional contract (pdf)
3. Upgraded authentication using email address and password + JWT authentication, run as a middleware across the endpoint group.
5. Store user data in memory and uploaded files on disk.

### Frontend Development

I've created a JavaScript & React frontend for the user management API using Bootstrap 5 for styling, with the
following features:
1. Displays a list of all users
2. Create a new user using a modal window
3. Update an existing user using a modal window
4. Delete a user
5. Upload & Download a file and associate it with a user
6. Display errors and success messages
7. Implement user login & sign up

## Steps to Initialise the Server
0. This server is built with Go, and uses the gorilla/mux package for handling requests and routes. Cross-Origin Resource Sharing (CORS) is also implemented to allow requests from localhost:3000. Before we begin, ensure you have cloned the repository containing the server code. Also, make sure Go is installed in your system.
1. **Install Required Dependencies**

    This server requires several packages to operate, which you can find in the go.mod file. If these packages are not already installed, use the `go get` command to install them:

    ```bash
    go get github.com/gorilla/mux
    go get github.com/rs/cors
    go get github.com/golang-jwt/jwt/v4
    go get golang.org/x/crypto
    ```

3. **Build the Server**

    To compile the Go program, use the `go build` command. This will create an executable file in the same directory:

    ```bash
    go build
    ```
    

4. **Run the Server**

    Start the server by running the executable file created by the `go build` command. If the name of the file is "Backend", the command would be:

    ```bash
    ./Backend
    ```
    
    Alternatively, you can simply use:
    
     ```bash
    go run main.go
    ```

    Anyway, the server should now be running and listening for HTTP requests on port 8000.

Remember that the CORS options set in the server code will only allow requests from http://localhost:3000. Also, only requests with GET, POST, PUT, DELETE methods are allowed, and any headers are allowed.

## Steps to Initialise the Client Side

Before you run the React App, you need to install the dependencies. You can run:

### `npm install`

Then, in the project directory, you can start the app by running the following command:

### `npm start`

This will open the React App in port 3000 by default. 
