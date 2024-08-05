const express = require('express');
const cors = require('cors');

const app = express();

const corsOption = {
    origin: "https://node-sample-frontend.vercel.app/"
}
app.use(cors(corsOption)); 
app.use(express.json());
app.use((req,res,next)=>{
    console.log('start');
    next()
    
})

const users = []; 

app.post('/users', (req, res) => {
    const { name, email, uname } = req.body;
    const newUser = {
        id: Date.now(),
        name,
        email,
        uname
    };
    users.push(newUser);
    res.status(201).json({ message: 'User created successfully', user: newUser });
});

app.use((req,res,next)=>{
    console.log('allusers');
    next()
    
})

app.get('/users', (req, res) => {
    res.json(users);
});

app.use((req,res,next)=>{
    console.log('allusersid');
    next()
    
})

app.get('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find(u => u.id === userId);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

app.put('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const { name, email, uname } = req.body;
    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex !== -1) {
        users[userIndex] = { id: userId, name, email, uname };
        res.json({ message: 'User updated successfully', user: users[userIndex] });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

app.delete('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex !== -1) {
        users.splice(userIndex, 1);
        res.json({ message: 'User deleted successfully' });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

app.listen(5000, () => console.log('Server running on port 5000'));
