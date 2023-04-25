import ExpressApp from "./expressApp";

const app = ExpressApp();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
