"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express")); // importing modules
var path_1 = __importDefault(require("path")); // importing modules
// create Express server
var app = express_1.default();
app.set("port", process.env.PORT || 3000);
// Express configuration
app.set('views', path_1.default.join(__dirname, '../views')); // templates located in views
app.set('view engine', 'pug');
// serve static files
app.use('/node_modules', express_1.default.static('node_modules'));
app.use(express_1.default.static(path_1.default.join(__dirname, '../src/public')));
// primary app routes
app.get("/", function (req, res) {
    res.render("index", { title: "Drawing Board" });
});
exports.default = app;
//# sourceMappingURL=app.js.map