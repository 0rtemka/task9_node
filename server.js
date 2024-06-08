require('dotenv').config();
const express = require('express')
const { userRouter } = require('./controller/userRouter')
const { errorHandler } = require('./errors/errorhandler');
const { commentRouter } = require('./controller/commentRouter');

const app = express()

const PORT = process.env.PORT;

app.use(express.json())
app.use(userRouter)
app.use(commentRouter)
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server is running on :${PORT}`);
})

