<img src="https://github.com/chesney-hardin/food-under-foot-client/blob/main/Copy%20of%20food%20under%20foot.png" alt="Logo" width="200" height="200"> 

# Food Under Foot 

## Application Overview

Here in the Southeast, we have so many wild edibles all around us! Think of blackberries, persimmons, chickweed, oyster mushrooms, ramps, pawpaws… Some are here for many months, some are here for mere days. It can be hard to keep track and remember what’s ready to harvest and when. Food Under Foot enables users to quickly view a list of wild edibles that are (theoretically) in season today! 
For those who may not be familiar with wild edibles, this app provides a great starting point by narrowing down the list to what you can expect to find.  Users may also keep track of wild harvests and their locations. This can be extremely useful information to refer back to year after year to recall the prime (or crappy) conditions for that one awesome (or rubbish) pawpaw harvest. 
Admin users are responsible for adding wild edibles to the database and editing them, if need be. In order to be an admin user, you must have many years of foraging experience and plant identification knowledge.

## Key Features 
### For Users
#### Wild Edibles Information:
<ol>
    <li> Users can view wild edibles that are currently in season.</li>
    <li>Users can view a wild species profile and learn about the edible parts of that species and its corresponding harvest season.</li>
    <li>Users can search all wild edibles by common name and/or edible part (i.e. "leaf", "fruit", "nut/seed", "mushroom")</li>
</ol>

#### Harvest Logs:
<ol>
    <li>Users can create harvest logs with a form that collects information about the harvest (date, location, species, quantity, description, etc.) Users can elect whether to make the log public or private.</li>
    <li>Users can view public harvest logs for each species with an integrated map view.</li>
    <li>Users can view, edit, and delete their own harvest logs.</li>
</ol>

#### Recipes and Harvest Tips:
<ol>
    <li>On each species, profile, users can view approved recipes and harevst tips posted by other users.</li>
    <li>Users can post a recipe or harvest tip for a specific species. Once approved by an admin, it will be made public.</li>
    <li>Users can view, edit, and delete recipes and harvest tips they have posted. They can also view the status of approval for each post.</li>
</ol>

### For Administrators:
#### Wild Edibles Information:
<ol>
    <li>Admin users can add new wild edibles to the database.</li>
    <li>Admin users can edit and delete wild edible profiles and their edible parts.</li>
</ol>

#### Recipes and Harvest Tips:
<ol>
    <li>Admin users can review recipes and harvest tips posted by users.</li>
    <li>Admin users can approve the recipes and tips. Once approved, they will be made public.</li>
    <li>Amdin users can unapprove of a recipe or tip if it is not in line with FUF's sustainable harvesting and safety guidelines. If an admin unapproves, then they are required to post the reason.</li>
</ol>

## Running This Application
### Serverside
1. Clone the repository for the server and move to that directory:
```sh
    git clone git@github.com:chesney-hardin/food-under-foot-server.git
    cd food-under-foot-server
```
2. Initialize virtual environment:
```sh
    pipenv shell
```
3. Install pipenv:
 ```sh
    pipenv install
```
4. Seed database with initial fixtures:
 ```sh
    ./seed_database.sh
```
5. Run the server:
```sh
    python manage.py runserver
```
### Clientside
1. Clone this repository and change to the directory.
```sh
    git clone git@github.com:chesney-hardin/food-under-foot-client.git
    cd food-under-foot-client
```
2. Install dependencies.
```sh
    npm install
```
3. Launch client.
```sh
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


