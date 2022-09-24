"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const loginRoutes_1 = __importDefault(require("./routes/loginRoutes"));
const app = (0, express_1.default)();
//body encoder
app.use(express_1.default.urlencoded({ extended: true }));
//routes
app.get("/", (req, res) => {
    res.send(`
      <h1>Welcome!</h1>
      `);
});
app.use(loginRoutes_1.default);
app.listen(5000, () => {
    console.log("listening on port 5000");
});
