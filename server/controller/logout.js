

const logout = () => {
    req.logout(function(err) {
        if (err) { return next(err); }
        else {
            res.sendStatus(200);
        }
      });
};


module.exports = {
    logout
};