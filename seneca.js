// const seneca = require("seneca")();

// function mailService(option) {
//   console.log(this);
//   this.add({role: "mail", cmd: "sendMail"}, (msg, reply) => {
//     console.log(msg);
//     reply(null, {res: "Service is callling"});
//   });
// }

// seneca.use(mailService).listen({
//   host: "127.0.0.1",
//   port: 3003,
//   // role: "mail",
// });

// seneca.act({role: "amit", cmd: "mail"}, (err, result) => {
//   if (err) return console.error(err);
//   console.log(result);
// });

var seneca = require("seneca")();

const addition = (option) => {
  seneca.add(
    {role: "math", cmd: "sum", integer: true},
    function (msg, respond) {
      // reuse role:math, cmd:sum
      console.log(msg);
      this.act(
        {
          role: "math",
          cmd: "sum",
          left: Math.floor(msg.left),
          right: Math.floor(msg.right),
        },
        respond(null, {res: msg.left + msg.right})
      );
    }
  );
};

seneca.use(addition).listen({
  host: "127.0.0.1",
  port: 3003,
  // role: "mail",
});

// seneca.act(
//   {role: "math", cmd: "sum", left: 1, right: 2},
//   function (err, result) {
//     if (err) return console.error(err);
//     console.log(result);
//   }
// );
