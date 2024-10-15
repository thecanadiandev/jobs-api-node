require('dotenv').config();
require('express-async-errors');
const express = require('express');

// extra security packages
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');

const app = express();

// connectDB
const connectDB = require('./db/connect');
const authenticateUser = require('./middleware/authentication');

// routes
const jobsRouter = require('./routes/jobs');
const authRouter = require('./routes/auth');

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(rateLimiter({
  windowMs: 15 * 60 * 1000, // `15 minutes`
  max: 100 // limit each IP to 100 requests per `window` (here, per 15 minutes)
}));
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

// extra packages

app.use('/api/v1/jobs', authenticateUser, jobsRouter);
app.use('/api/v1/auth', authRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  await connectDB(process.env.MONGO_URI);
  try {
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
