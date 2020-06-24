export default function(app) {
    // Insert routes below
    app.use('/users', require('./api/user'));
    app.use('/auth', require('./auth/index').default);
}