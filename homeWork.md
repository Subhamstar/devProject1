# devTinder
- POST /signUp
- POST /login
- POST /logout

- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

- POST /request/send/interested/:userId      --> POST /request/send/:status/:userId
- POST /request/send/ignored/:userId

- POST /request/review/accepted/:requestId   --> POST /request/send/:status/:requestId
- POST /request/review/ignored/:requestId

- GET /connections
- GET /requests/received
- GET /feed  - Gets you the profile of other user on the platform 