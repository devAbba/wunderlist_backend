# wunderlist_backend

## Requirements

## Setup
- Install dependencies using
```
npm install
```
- pull this repo
- update env with example.env
- run 
```
npm run start-dev
```

---

## Base URL
- https://wild-cyan-bullfrog-tutu.cyclic.app/


## Models
---

### User
| field  |  data_type | constraints  |
|---|---|---|
|  id |  ObjectId |  required |
|  first_name | string  |  required  |
|  last_name  | string  |  required  |
|  email     | string  |  required  |
|  password |   string |  required  |

## APIs
---

### Signup User

- Route: '/users/signup'
- Method: POST
- Body: 
  ```
  {
    "first_name": "John",
    "last_name": "Doe",
    "email": "jDoe@domain.io",
    "password": "Password",
  }
  ```
- Responses
  ```
  {
    "status": true,
    "user": {
        "_id": "6433dd8e579086baa243074e",
        "email": "jDoe@domain.io",
        "first_name": "John",
        "last_name": "Doe"
    }
  }
  ```

### Login User

- Route: '/users/login'
- Method: POST
- Body: 

  ```
  {
    "email": "jDoe@domain.io",
    "password": "Password",
  }
  ```

- Responses
  ```
  {
    "status": true,
    "user": {
        "_id": "6433dd8e579086baa243074e",
        "email": "jDoe@domain.io",
        "first_name": "John",
        "last_name": "Doe"
    }
  }
  ```
  

### Google Login
- Route: '/auth/google'
- Responses
  ```
  {
    "status": true,
    "user": {
        "_id": "6433dd8e579086baa243074e",
        "first_name": "John",
        "last_name": "Doe",
        "email": "jDoe@domain.io"
    }
  }
  ```

### Logout User

- Route: '/users/logout'
- Method: GET
