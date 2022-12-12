"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const activityRoutes_1 = __importDefault(require("./routes/activityRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const authorize_1 = __importDefault(require("./middlewares/authorize"));
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
const auth_1 = require("./constants/auth");
dotenv_1.default.config();
const { PORT, DATABASE_URL, SESSION_SECRET_KEY, NODE_ENV } = process.env;
const app = (0, express_1.default)();
// Connect to Database
mongoose_1.default.connect(DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, () => console.log('Database connection is established!'));
mongoose_1.default.connection.on('error', () => console.error('MongoDB Connection Error!'));
// General Middlewares: CORS, Session, JSON
app.use((0, cors_1.default)({ origin: true, credentials: true }));
app.use(express_1.default.json());
if (NODE_ENV === 'production') {
    console.log('Setting up reverse proxy config');
    app.set('trust proxy', 1);
}
app.use((0, express_session_1.default)({
    name: 'sid',
    secret: SESSION_SECRET_KEY,
    saveUninitialized: false,
    proxy: true,
    store: connect_mongo_1.default.create({
        mongoUrl: DATABASE_URL,
        ttl: auth_1.SESSION_EXPIRY_ONE_DAY,
    }),
    cookie: {
        maxAge: auth_1.SESSION_EXPIRY_ONE_DAY,
        sameSite: NODE_ENV === 'production' ? 'none' : undefined,
        secure: NODE_ENV === 'production',
        httpOnly: false,
    },
    resave: false,
}));
app.use('/api/auth', authRoutes_1.default);
app.use('/api/activities', authorize_1.default, activityRoutes_1.default);
// Client Error handler
app.use(errorHandler_1.default);
app.listen(PORT, () => {
    console.log('Server is running!');
});
