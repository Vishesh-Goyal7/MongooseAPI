Libraries Required:<br/>
    - Express<br/>
    - Bcryptjs<br/>
    - jsonwebtoken<br/>
    - joi<br/><br/>

Update1 : <br/>
    1) This repository contains how to make a small database using REST API and MongoDB. Main features are:<br/>
        1.1) It takes user data on signup request and stores it using MongoDB. <br/>
        1.2) On sign in request, only the email and password are asked, verified and if verification is true, data about user is given back<br/>
        1.3) On sign in, a token is generated for the user that is valid for 1 hour. If that token is copied and passed in the header as bearer token under authorisation, even then     the information is given back<br/><br/>
        
    TimeStamp - 15/06/2024-12:56
