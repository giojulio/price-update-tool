import { app } from "./app";
import { productRouter } from "./controller/router/ProductsRouter";

app.use("/", productRouter);
