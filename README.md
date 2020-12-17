# SE-Projekt
Software Engineering Projekt 5. Semester 

## How To Install:

### Prerequesites:

1. Download and install the latest version of [NodeJS](https://nodejs.org/en/download/)
2. Download and install the latest version of [MariaDB](https://downloads.mariadb.org/)
3. Clone this repository to your local drive

### Set up MariaDB:

- After successful installation open HeidiSQL (GUI) or MySQL via CMD
- Create a database called "visitor_tracker"
- Grant all privileges on visitor_tracker.* to admin identified by 'admin123456'

### Install dependencies:

- Open CMD
- Go to '<your_local_path>\SE-Projekt\my-app'
- Run 'npm install' and wait until the installation is finished
- Go to '<your_local_path>\SE-Projekt\my-app-backend\'
- Run 'npm install' and wait until the installation is finished

### Run backend:

- Go to '<your_local_path>\SE-Projekt\my-app-backend\src'
- Run 'node .\server.js'

### Run frontend:

- Go to Go to '<your_local_path>\SE-Projekt\my-app\'
- Run npm start
- Click "yes" to run on port 3001
- Your browser should automatically open 'localhost:3001'

### Additional Notes:

- Note: When starting the backend, there will automatically be data created. You can disable this behaviour by changing the server.js file.
- Access the frontend with localhost:3001/
- Access the backend with localhost:30001/admin
- Default username: testuser
- Default password: password123

### Excel Export 
 - By clicking on Export the user will receive an .CSV document. 
 - To transform this to an Excel table do the following: 
    - Go to 'Data' tab.
    -  Select 'From Text'and choose the .CSV file which you want to import. 
    - Make sure to choose the 'Comma' selection. 
    - When you are done click 'Finish' 
 

