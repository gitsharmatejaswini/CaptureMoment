/**
 * CustomerController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
var bcrypt = require("bcrypt");

module.exports = {
  // login: function (req, res) {
  //   if (!req.param("name")) {
  //     return res.send("No user is available");
  //   }
  //   return res.send("hello User");
  // },
  create: function (req, res) {
    console.log(req.body);
    Customer.create(req.body)
      .then(function (user) {
        return res.json(user);
      })
      .catch(function (err) {
        sails.log.debug(err);
      });
  },

  fetch: function (req, res) {
    //   if (req.body.email) {
    //     Customer.fetch({ where: { email: req.body.email } })
    //       .then(function (user) {
    //         return res.json(user);
    //       })
    //       .catch(function (err) {
    //         return res.serverError(err);
    //       });
    //   }
    // },
    console.log(req.body);
    Customer.find()

      .then(function (user) {
        if (!user) {
          return res.notFound();
        }
        return res.json(user);
      })
      .catch(function (err) {
        return res.serverError(err);
      });
  },

  fetchone: function (req, res) {
    //   if (req.body.email) {
    //     Customer.fetch({ where: { email: req.body.email } })
    //       .then(function (user) {
    //         return res.json(user);
    //       })
    //       .catch(function (err) {
    //         return res.serverError(err);
    //       });
    //   }
    // },
    console.log(req.body);
    Customer.find({ email: req.body.email })

      .then(function (user) {
        // if (!user) {
        //   return res.notFound();
        // }
        return res.json(user);
      })
      .catch(function (err) {
        return res.serverError(err);
      });
  },

  delete: function (req, res) {
    console.log(req.param("email"));
    Customer.destroy({ where: { email: req.param("email") } })
      .then(function (users) {
        console.log(users);
        console.log("deleted");
        return res.send("deleted");
        return res.json(users);
      })
      .catch(function (err) {
        console.log(err);
      });
  },

  // deleteAll: function () {
  //   Customer.destroy().then(function () {
  //     return res.json("deleted entire records");
  //   });
  // },
  //
  update: function (req, res) {
    console.log(req.body.email);

    if (req.body.email) {
      console.log("email here");

      Customer.update({ email: req.body.email }, req.body)

        .then(function (user) {
          console.log("Update ");
          console.log(user);
          return res.json(user);
        })
        .catch(function (err) {
          console.log(err);
        });
    } else {
      console.log("Not updated");
    }
  },

  login: function (req, res) {
    // console.log(req.body);
    // console.log(req.body.email);

    // if (res) {
    //   if (req.body.email) {
    //     Customer.find({
    //       where: {
    //         email: req.body.email,
    //         // password: req.body.password,
    //       },
    //     }).then(function (user) {
    //       if (!user || user.length == 0) {
    //         return res.send("user not found");
    //       } else {
    //         console.log(user[0].email);
    //         // console.log(user[0].role);
    //         console.log(user);
    //         bcrypt.compare(req.body.password, user[0].password, function (
    //           err,
    //           data
    //         ) {
    //           // if (err) {
    //           //   console.log("password not matched");
    //           // }
    //           if (data) {
    //             console.log(data);
    //             // console.log(data[0].firstname);
    //             // return res.json(data);
    //           }
    //           // if (err) throw err;

    //           // //if both match than you can do anything
    //           // if (data) {
    //           //   return res.status(200).json({ msg: "Login success" });
    //           // } else {
    //           //   return res.status(401).json({ msg: "Invalid credencial" });
    //           // }
    //         });
    //       }
    //     });
    //   }
    // }
    console.log(req.body.email);

    Customer.findOne({
      email: req.body.email,
    }).exec(function (err, user) {
      if (err) {
        console.log("user not found");
      }
      if (!user) {
        return res.notFound({
          err: "Could not find email," + req.body.email + " sorry.",
        });
      }
      //Compare the password
      console.log(req.body.password);
      console.log(user.password);
      bcrypt.compare(req.body.password, user.password, function (err, result) {
        if (result) {
          //password is a match
          console.log(user);
          return res.send(user);
        } else {
          //password is not a match
          return res.forbidden({
            err: "Email and password combination do not match",
          });
        }
      });
    });

    // result == true
    // if (req.body.email && req.body.password) {
    //   Customer.find({
    //     where: {
    //       email: req.body.email,
    //       password: req.body.password,
    //     },
    //   }).then(function (user) {
    //     console.log(user);
    //     if (!user || user.length == 0) {
    //       return res.send("user not found");
    //     } else {
    //       res.send(user);
    //     }
    //   });
    // }
  },
};
