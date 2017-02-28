# Hundred national sites of Bulgaria
Front-End Development Project

### Users pages/functionality

- **Users** can **Register**, **Login** and **Logout** in the application
  - Users provide `username`  and `password`
- **All users** (even not logged in) can
  
- **Registered and Logged-in users** can:
  - **Have** a profile page on `/users/:username`
  - **Create** a new material
    - Providing `title`, `description` and optionally `img`
  - **Leave** comments on existing materials
    - Prodiving `commentText`
  - Assign a **Status** to a material
  	 - Status can be `want-to-watch`, `watched`, `watching`

### User Profile pages/functionality

- Shows the current users details by username

### Sites pages/functionality


## Application routes

- `#/`
  - Redirects to `#/home`
- `#/home`
  - Shows all materials
  - Available to all users, logged-in or not
- `#/home?filter=XXXXXX` or `#/home/XXXXXX`
  - Shows the materials that match the search phrase in the _Search Page_
  - Available to all users, logged-in or not
- `#/materials/:id`
  - Shows the materials the _Details page_ of the material with the provided `id`, with full description
      - Logged in users only should be able to change the status of the material (`want-to-watch`, `watched`, `watching`)
  - Available to all users, logged-in or not
- `#/profiles/:username`
  - Shows the profile of user with the `username` passed in the URL
  - `#/profiles/john` should show the profile of the user `john`
  - Available to all users, logged-in or not