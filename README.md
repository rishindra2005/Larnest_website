# User Management System

## Description

This project is a User Management System that allows users to register, login, and manage their profiles. It includes features such as user authentication, profile picture upload, and storing user information securely.

## Features

- User registration with full name, email, and password
- Secure password hashing using bcrypt
- Profile picture upload functionality
- User authentication
- JSON-based user data storage

## Project Structure

- `server.js`: Main entry point of the application
- `public/`: Directory containing publicly accessible files
  - `profile_pics/`: Subdirectory for storing user profile pictures
- `users.json`: File storing user information
- `styles.css`: CSS styles for the application
- Various HTML files (`index.html`, `login.html`, etc.) for different pages

## Technologies Used

- Node.js
- Express.js
- bcrypt for password hashing
- multer for handling file uploads
- cors for handling Cross-Origin Resource Sharing

## Installation

1. Clone the repository
2. Run `npm install` to install dependencies
3. Start the server with `npm start`

## Usage

After starting the server, you can access the application through a web browser. The main functionalities include:

- Registering a new user account
- Logging in with existing credentials
- Uploading and updating profile pictures
- Viewing user profiles

## API Endpoints

- POST /register: Register a new user
- POST /login: Authenticate a user
- POST /upload: Upload a profile picture

## Security

- Passwords are hashed using bcrypt before storage
- User data is stored in a JSON file (`users.json`)

## Contributing

Contributions to improve the project are welcome. Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the Apache License 2.0. See the [LICENSE](https://www.apache.org/licenses/LICENSE-2.0.html) file for details.

## Copyright

All copyrights reserved by Risheendra.

## Contact

For any queries or suggestions, please contact the project maintainer.