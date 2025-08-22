# Devtinder


## authRouter
-POST /signup
-POST/login
-POST/logout

## profileRouter
-GET/profile/view
-PATCH/profile/edit
-PATCH/profile/password

## connectionRequestRouter
-POST/request/send/interested/:userId
-POST/request/send/ignored/:userId
-POST/request/review/accepted/:requestId
-POST/request/review/rejected/:requestId

## userRouter
-GET/user/connections
-GET/user/request
-GET/user/feed - Geets you the profile of of other on the platform


Status:ignored,interested,accepted,rejected

