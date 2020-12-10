const express = require('express');
const connectDB = require('./config/db')
const app = express();

//connect Database
connectDB();

//init Middleware
app.use(express.json( {extended: false}))


app.get('/',(req , res) => res.send('API Running'))


//Define Routes
app.use('/api/users' , require('./routes/api/users'))
app.use('/api/Auth' , require('./routes/api/Auth'))
app.use('/api/profile' , require('./routes/api/Profile'))
app.use('/api/Posts' , require('./routes/api/Posts'))

const PORT = process.env.PORT || 4000;

app.listen(PORT , () => console.log(`Server Started on port ${PORT}`));
