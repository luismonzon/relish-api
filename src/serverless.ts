import ServerlessHttp from "serverless-http";
import ExpressApp from "./expressApp";

const app = ExpressApp();

const handler = ServerlessHttp(app);

export { handler };
