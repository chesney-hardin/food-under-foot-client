<img src="https://github.com/chesney-hardin/food-under-foot-client/blob/main/Copy%20of%20food%20under%20foot.png" alt="Logo" width="200" height="200"> 

# Food Under Foot 

## Application Overview

Here in the Southeast, we have so many wild edibles all around us! Think of blackberries, persimmons, chickweed, oyster mushrooms, ramps, pawpaws… Some are here for many months, some are here for mere days. It can be hard to keep track and remember what’s ready to harvest and when. Food Under Foot enables users to quickly view a list of wild edibles that are (theoretically) in season today! 
For those who may not be familiar with wild edibles, this app provides a great starting point by narrowing down the list to what you can expect to find.  Users may also keep track of wild harvests and their locations. This can be extremely useful information to refer back to year after year to recall the prime (or crappy) conditions for that one awesome (or rubbish) pawpaw harvest. 
Admin users are responsible for adding wild edibles to the database and editing them, if need be. In order to be an admin user, you must have many years of foraging experience and plant identification knowledge.




## Running This Application


1. Clone this repository and change to the directory in the terminal.

```sh
    git clone git@github.com:chesney-hardin/food-under-foot-client.git
    cd food-under-foot-client
```
2. Access the data.

```sh
    git clone git@github.com:chesney-hardin/food-under-foot-server.git
    cd food-under-foot-server
    pipenv shell
    python manage.py runserver
```

3. Launch the client.

```sh
    npm install
    npm start
```

#### Demo User Credentials

*** Warning About Security *** </br>
This application uses mock authentication which is purely for demonstration purposes. Therefore the login and registration code written here is completely insecure and would never be implemented in a professional application.

Admin:
<p>
Username: <i>admin@foodunderfoot.com</i>
<br>
Password: <i>edible</i>
</p>

User:
<p>
Username: <i>user@foodunderfoot.com</i>
<br>
Password: <i>edible</i>
</p>


