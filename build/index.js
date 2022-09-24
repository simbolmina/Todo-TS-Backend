"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const todoRoutes_1 = __importDefault(require("./routes/todoRoutes"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
//body encoder
app.use(body_parser_1.default.json());
//routers
app.use("/api/user", userRoutes_1.default);
app.use("/api/todo", todoRoutes_1.default);
mongoose_1.default
    .connect("mongodb+srv://simbolmina:Tcsg-134ATLAS@cluster0.79oxdag.mongodb.net/todo?retryWrites=true&w=majority")
    .then(() => {
    app.listen(5000, () => {
        console.log("DB connection is ok, listening on port 5000");
    });
})
    .catch((err) => {
    console.log(err);
});
