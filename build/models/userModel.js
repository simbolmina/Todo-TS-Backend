"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
const Schema = mongoose_1.default.Schema;
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: { type: String, required: true, unique: true },
    password: {
        type: String,
        required: true,
        minlenght: 4,
    },
    todos: [{ type: mongoose_1.default.Types.ObjectId, ref: "Todo" }],
    role: String,
});
//check if new users email is unique;
userSchema.plugin(mongoose_unique_validator_1.default);
module.exports = mongoose_1.default.model("User", userSchema);
