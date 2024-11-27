const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const cors = require('cors');
const ip = require('ip');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname)));
app.use(cors());
app.use(bodyParser.json());


const corsOptions = {
    origin: '*', // This allows all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  };
  
  app.use(cors(corsOptions));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/profile_pics/') // Make sure this directory exists
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)) // Appending extension
    }
});

const upload = multer({ storage: storage });

function getUsers() {
    try {
        const data = fs.readFileSync('users.json', 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading users.json:', error);
        return [];
    }
}

function saveUsers(users) {
    try {
        fs.writeFileSync('users.json', JSON.stringify(users, null, 2), 'utf8');
    } catch (error) {
        console.error('Error writing to users.json:', error);
    }
}



app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve other HTML files
app.get('/:page', (req, res, next) => {
    const page = req.params.page;
    const filePath = path.join(__dirname, `${page}.html`);
    
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            next(); // Pass to the next middleware if file doesn't exist
        } else {
            res.sendFile(filePath);
        }
    });
});

app.post('/api/signup', upload.single('profilePic'), (req, res) => {
    const { fullname, email, password } = req.body;

    // Read existing users
    let users = JSON.parse(fs.readFileSync('users.json', 'utf8'));

    // Check if user already exists
    if (users.some(user => user.email === email)) {
        return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Create new user object
    const newUser = {
        fullname,
        email,
        password: hashedPassword,
        profilePic: req.file ? `/profile_pics/${req.file.filename}` : null
    };

    // Add new user to the array
    users.push(newUser);

    // Write updated users array back to the file
    fs.writeFileSync('users.json', JSON.stringify(users, null, 2));

    res.json({ message: 'Signup successful' });
});







app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    const users = getUsers();
    const user = users.find(u => u.email === email);
    if (user) {
        // Compare the provided password with the stored hash
        const match = await bcrypt.compare(password, user.password);
        if (match) {
            res.json({
                message: 'Login successful',
                user: {
                    fullname: user.fullname,
                    email: user.email,
                    profilePic: user.profilePic
                }
            });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});


const PORT = process.env.PORT || 3000;


app.listen(port, '0.0.0.0', () => {
    console.log(`Server running at http://${ip.address()}:${PORT}`);
    console.log(`Server running at http://localhost:${PORT}`);

});