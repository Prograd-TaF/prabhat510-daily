let db = [
  {
    id: 0,
    name: "pushpa",
    balance: 60000,
  },
  {
    id: 1,
    name: "seema",
    balance: 10000,
  },
  {
    id: 2,
    name: "ravi",
    balance: 50000,
  },
];

const fs = require("fs");
syncChanges();
function syncChanges() {
  fs.writeFile("./wallet.txt", JSON.stringify(db), (error) =>
    console.log(error)
  );
  fs.readFile("./wallet.txt", "utf-8", (error, data) => {
    data = JSON.parse(data);
    db = data;
  });
}

const port = 8080;
const http = require("http");
const server = http.createServer((req, res) => {
  res.setHeader("content-type", "text/html");
  // /user/create/username
  if (/\/user\/create\/[a-zA-Z0-9]/.test(req.url)) {
    const request_url = req.url.split("/");
    const username = request_url[request_url.length - 1];
    const last_user = db[db.length - 1];
    const user_exists = db.find((obj) => {
      return obj.name === username;
    });
    const newUser = {
      id: last_user.id + 1,
      name: username,
      balance: 0,
    };
    if (user_exists === undefined) {
      db.push(newUser);
      res.write("user created");
    } else {
      res.write("<h4>This Username Has Already Been Taken</h4>");
    }
    syncChanges();
  }

  // /user/withdrawal/amount
  else if (/\/[a-zA-Z0-9]+\/withdrawal\/[0-9]+/.test(req.url)) {
    res.write("<h2>Welcome!!</h2>");
    const request_url = req.url.split("/");
    const request_user = request_url[request_url.length - 3];
    const requested_amount = request_url[request_url.length - 1];
    let idx = -1;
    const user_exists = db.find((obj, index) => {
      if (obj.name === request_user) {
        idx = index;
        return true;
      }
      return false;
    });

    if (user_exists !== undefined) {
      if (requested_amount > user_exists.balance) {
        res.write("<h4>Insufficient balance</h4>");
      } else {
        res.write(
          `${requested_amount} rupees withdrawn, remaining balance is ${
            user_exists.balance - requested_amount
          }`
        );
        db[idx].balance -= requested_amount;
      }
    } else {
      res.write("<h4>usernamedoesnot match</h4>");
    }
    syncChanges();
  }
  // /user/credit/amount
  else if (/\/[a-zA-Z0-9]+\/credit\/[0-9]+/.test(req.url)) {
    const request_url = req.url.split("/");
    const request_user = request_url[request_url.length - 3];
    const requested_amount = request_url[request_url.length - 1];
    let idx = -1;
    const user_exists = db.find((obj, index) => {
      if (obj.name === request_user) {
        idx = index;
        return true;
      }
      return false;
    });

    if (user_exists !== undefined) {
      db[idx].balance += parseInt(requested_amount);
      res.write(
        `${requested_amount} rupees has been credited to your account, your updated balance is ${
          db[user_exists.id].balance
        }`
      );
    } else {
      res.write("<h4>username doesnot match</h4>");
    }
    syncChanges();
  }
  //  /user
  else if (/\/user\/[a-zA-Z0-9]+/.test(req.url)) {
    const request_url = req.url.split("/");
    const request_user = request_url[request_url.length - 1];
    const user_exists = db.find((obj) => {
      return obj.name === request_user;
    });
    if (user_exists !== undefined) {
      const user_info = db.find((obj) => {
        return obj.name === request_user;
      });
      res.write(`
      id: ${user_info.id} <br>
      username: ${user_info.name}<br>
      balance: ${user_info.balance}`);
    } else {
      res.write("<h4>user doesnot exits</h4>");
    }
    syncChanges();
  } else {
    res.write("<h2>Invalid Request!!</h2>");
  }
  //   syncChanges();
  res.end();
});
server.listen(port, () => {
  console.log("listening...");
});
// update write and read
