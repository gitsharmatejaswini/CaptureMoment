var mymodule = angular.module("ht", ["ngRoute"]);
mymodule.config(function ($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "/website.html",
    })
    .when("/website", {
      templateUrl: "/website.html",
    })
    .when("/Login", {
      templateUrl: "/login.html",
    })

    .when("/register", {
      templateUrl: "register.html",
    })
    .when("/General", {
      templateUrl: "general.html",
      controller: "generalCtrl",
    })
    .when("/edit", {
      templateUrl: "update.html",
    })
    .when("/generalupdate", {
      templateUrl: "generalupdate.html",
      // controller: "updateCtrl",
    })
    .when("/Admin", {
      templateUrl: "Admin.html",
    });
});

mymodule.controller("SearchController", function (
  $scope,
  $http,
  $location,
  $rootScope
) {
  $scope.changeview = function () {
    $location.path("/Login");
  };
  // $scope.edit = function () {
  //   $location.path("/edit");
  // };
});
mymodule.controller("login", function ($scope, $http, $location, $rootScope) {
  console.log($rootScope);
  $scope.email = null;
  $scope.password = null;

  $scope.detail = function () {
    alert("You Pressed Login.");

    console.log($scope);

    $http
      .post("http://localhost:1337/login", {
        email: $scope.email,
        password: $scope.password,
      })
      .then(
        function (res) {
          console.log(res.data);
          // console.log(res.data.firstname);
          // $scope.firstname = res.data.firstname;
          // $scope.email = res.data[0].email;
          // $scope.role = res.data[0].role;
          // console.log($scope.firstname);
          // console.log($scope.role);
          if (res.data.role == "admin") {
            $location.path("/Admin");
          } else if (res.data.role == "general") {
            // $rootScope.email = res.data.email;
            localStorage.setItem("email", res.data.email);
            $location.path("/General");
          }
        },
        function (res) {
          $scope.firstname = "Service not Exists";
        }
      );
  };
});
mymodule.controller("register", function ($scope) {
  $scope.clicked = function () {
    window.location = "#/register";
  };
});

mymodule.controller("signup", function ($scope, $http, $location) {
  $scope.register = function () {
    console.log($scope);
    $http
      .post("http://localhost:1337/create", {
        email: $scope.email,
        firstname: $scope.firstname,
        lastname: $scope.lastname,
        role: $scope.role,
        dob: $scope.dob,
        password: $scope.password,
      })
      .then(
        function (res) {
          // if (err) throw err;
          console.log(res.data);
          // res.json(data);
          alert("Registered successfully!!");
        },
        function (res) {
          console.log("register failed");
        }
      );
  };
});

mymodule.controller("adminCtrl", function ($scope, $http, $location) {
  $scope.records = function () {
    $http.post("http://localhost:1337/fetch").then(
      function (res) {
        $scope.dataset = res.data;
        console.log($scope.dataset);
        console.log(res.data);
      },
      function (res) {
        console.log("No data available");
      }
    );
  };
});

mymodule.controller("updateCtrl", function ($scope, $http, $rootScope) {
  $scope.update = function () {
    console.log($scope.editdata);
    console.log($scope.editfirstname);
    $http
      .post("http://localhost:1337/update", {
        email: $rootScope.editdata,
        firstname: $scope.editfirstname,
        lastname: $scope.editlastname,
        role: $scope.editrole,
        dob: $scope.editdob,
        // password: $scope.password,
      })
      .then(function (res) {
        $scope.data = res.data;

        console.log($scope.data);
        alert("Updated successfully!!");
      });
  };
});

mymodule.controller("generalCtrl", function (
  $scope,
  $http,
  $location,
  $rootScope
) {
  // $scope.general = function () {
  console.log(localStorage.getItem("email"));
  $http
    .post("http://localhost:1337/fetchone", {
      email: localStorage.getItem("email"),
    })
    .then(function (res) {
      $scope.firstname = res.data[0].firstname;
      $scope.lastname = res.data[0].lastname;
      $scope.email = res.data[0].email;
      $scope.role = res.data[0].role;
      $scope.password = res.data[0].password;
    });

  $scope.logout = function () {
    localStorage.removeItem("email");
    $location.path("/Login");
  };
  $scope.edit = function (email, firstname, lastname, dob, role) {
    $rootScope.gemail = email;
    $rootScope.gfirstname = firstname;
    $rootScope.glastname = lastname;

    $rootScope.gdob = dob;
    $rootScope.grole = role;
    $location.path("/generalupdate");
  };
  // };
});

mymodule.controller("editCtrl", function (
  $scope,
  $http,
  $location,
  $rootScope
) {
  $scope.editfun = function (
    editemail,
    editfirstname,
    editlastname,
    editrole,
    editdob
  ) {
    $rootScope.editdata = editemail;
    $rootScope.editfirstname = editfirstname;
    $rootScope.editlastname = editlastname;

    $rootScope.editrole = editrole;
    $rootScope.editdob = editdob;
    $location.path("/edit");

    // $http
    //   .post("http://localhost:1337/fetchone", {
    //     email: $rootScope.email,
    //   })
    //   .then(function (res) {
    //     $scope.firstname = res.data[0].firstname;
    //     $scope.lastname = res.data[0].lastname;
    //     $scope.email = res.data[0].email;
    //     $scope.role = res.data[0].role;
    //     $scope.password = res.data[0].password;
    //   });
  };

  $scope.deletedata = function (emailID) {
    console.log(emailID);
    $http.get("http://localhost:1337/delete/" + emailID).then(function (res) {
      window.location.reload(true);
      alert("Record Deleted");
    });
  };
});

mymodule.controller("generalupdateCtrl", function (
  $scope,
  $rootScope,
  $http,
  $location
) {
  $scope.updategeneral = function () {
    console.log($scope.gemail);
    $http
      .post("http://localhost:1337/update", {
        email: $rootScope.gemail,
        firstname: $rootScope.gfirstname,
        lastname: $rootScope.glastname,
        dob: $rootScope.gdob,
        role: $rootScope.grole,

        // password: $scope.password,
      })
      .then(function (res) {
        $scope.data = res.data;

        console.log($scope.data);
        alert("Updated successfully!!");
      });
  };
});

//
