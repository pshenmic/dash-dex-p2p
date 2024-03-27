module.exports.destroySession = (req, res) => {
    req.session.destroy(err => {
        if (err) {
          console.error('Error destroying session:', err);
          res.status(500).send('Internal Server Error');
        } else {
          res.redirect('/login'); // Redirect to login page or any other page
        }
      });
}