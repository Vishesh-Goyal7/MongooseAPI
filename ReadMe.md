Libraries Required:
    - Express
    - Bcryptjs
    - jsonwebtoken
    - joi

Update1 : 
    - This repository contains how to make a small database using REST API and MongoDB. Main features are:
        - It takes user data on signup request and stores it using MongoDB. 
        - On sign in request, only the email and password are asked, verified and if verification is true, data about user is given back
        - On sign in, a token is generated for the user that is valid for 1 hour. If that token is copied and passed in the header as bearer token under authorisation, even then the information is given back
    
    - TimeStamp - 15/06/2024-12:56
    