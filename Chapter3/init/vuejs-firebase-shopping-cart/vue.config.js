module.exports = {
  devServer: {
    before: function(app, server, compiler) {
        app.get('/admin', function(req, res) {
            res.redirect('/login');
        });
      }
    }
};
