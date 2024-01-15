import express from "express";
import { PORT, mongoDBURL } from "../backend/config.js";
import mongoose from "mongoose";
// import { Book } from "../backend/models/bookModel.js";
import booksRoutes from "./routes/booksRoutes.js";
import cors from "cors";

const app = express();

/**Middleware in Express.js
 * is a function that gets executed between the incoming request and the outgoing response
 * Execution Order: Middleware functions are always invoked in the order they are added
 *
 * Access to Request and Response: Middleware functions have access to the request object,
 * the response object, and the next middleware function in the application’s request-response cycle
 *
 * Tasks Performed: Middleware functions can execute any code,
 * make changes to the request and the response objects,
 * end the request-response cycle, and call the next middleware function in the stack
 *
 * Types of Middleware: An Express application can use several types of middleware,
 * including application-level middleware, router-level middleware, error-handling middleware,
 * built-in middleware, and third-party middleware
 *
 * Middleware Chaining: Middleware can be chained from one to another,
 * creating a chain of functions that are executed in order.
 * The next() function in Express.js is responsible for calling the next middleware function if there is one
 *
 * In essence,
 * middleware functions are a way to encapsulate functionality that needs to happen before the final route handler is called.
 * They can be used for a variety of tasks, such as logging, authentication, validation, and more1
 */

/**app.use():
 * This function is used to add middleware to the application stack in Express.js123.
 * express.json():
 * This is a built-in middleware function in Express.js.
 * It parses incoming requests with JSON payloads and is based on body-parser
 */

/**Putting it together,
 * app.use(express.json());
 *  adds a middleware function that parses incoming JSON requests.
 * The parsed data is then made available in req.body.
 * This means that when you want to access the data sent in the body of the request,
 * you can access it directly with req.body.
 */

app.use(express.json());

/**cors():
 * This is a middleware function provided by the cors package.
 * It enables Cross-Origin Resource Sharing (CORS) with various options
 */

/**Putting it together,
 * app.use(cors());
 * adds a middleware function that attaches CORS headers to your Express HTTP responses.
 * This allows the server to support cross-origin requests from the client-side,
 * which is particularly important when building APIs that are accessed from different domains
 */

app.use(cors());

// const corsOptions = {
//   origin: ["http://localhost:5555/", "http://localhost:5173"],
//   methods: ["GET", "PUT", "POST", "DELETE"],
//   allowedHeaders: ["Content-Type"],
// };

// app.use(cors(corsOptions));

app.get("/", (req, res) => {
  console.log(req);
  return res.status(200).send("Welcome To MERN Tutorial");
});

app.use("/books", booksRoutes);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App is connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening to PORT : ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
