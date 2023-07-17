# Motus

## The game
The user can create a game, in with, he will search for a word.
You save each try, and the result.

For example
you search for lions

the user send lotor
you send 10x0x

Where x is not good
and 1 is good
and 0 is not at the right position

The response should be like this

```javascript
{
    "word": "lotor",
    "response": "10X0x"
    "game": {}
}
```

## Things to do

- Add vérification to the route already created
- Finished the verify route to send the response to the user
- Finished the CRUD of Word

## Installation
- clone the project
- run the command
- docker compose up
- npm i

## Authentication
- register user
- login
- login provides with response access token
- to call the apis send the access token to header with the attribute "access_token": "Bearer ${token}"

## Apis 

# User api
- http://localhost:5000/auth/register
- http://localhost:5000/auth/login

# Word apis
- create word - post method - http://localhost:5000/word
- udpate word - put method  - http://localhost:5000/word/:id
- delete word - delete method - http://localhost:5000/word/:id

# Game apis
- create game   - post method - http://localhost:5000/game/new
- verify word   - post method - http://localhost:5000/game/verify












