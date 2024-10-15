# Setup postman

Add a new environment "Jobs" and add a variable "URL" pointing to
`http://localhost:3000/api/v1`

Create a new collection `Jobs` and under that, add register, auth, jobs routes

- POST: `{{URL}}/auth/register`

```
// in body-raw

{
  "name": "hari",
  "email": "hari@gmail.com",
  "password": "secret"
}
```

- POST: `{{URL}}/auth/login`

```
// in the body, raw
{
  "email": "hari@gmail.com",
  "password": "secret"
}
```

If we check the database in mongodb, we would have seen a new entry.

## Add a route for Get All jobs

- GET: `{{URL}}/jobs`

in the Headers tab in Postman, add

```
Authorization : Bearer <token>
```

The token will be received when we login with credentials. Jobs created with that login will be displayed then.

## To set token dynamically

For the login request, under Scripts > post-res

```
const jsonData = pm.response.json();
pm.globals.set("accessToken", jsonData.token)
```

So, when we login, if we check the enviironments, there will be a global accessToken added.

With that, we can remove the Authoriztion: Bearer `<token>` from the Headers of the Get all jobs request, and instead, under Authorization tab, select Bearer Token, and select `{{ accessToken}}` in the tokens section. Now, further requests will automatically add this token.
