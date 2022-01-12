import express from "express";

var cors = require("cors");
const router = express.Router();
const app = express();

app.set("port", process.env.PORT || 3001);
app.use("/", router);
app.use(cors());

// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// sot = savings over time
// receives isa ( = initial savings amount),
//            d ( = deposit),
//           dp ( = deposit period in months),
//           ir ( = interest rate),
//          irp ( = interest rate period in months)
//          dur ( = duration in months)

router.get("/sot/:isa/:d/:dp/:ir/:irp/:dur", cors(), (request, response) => {
  var isa = parseFloat(request.params.isa);
  var d = parseFloat(request.params.d);
  var dp = parseFloat(request.params.dp);
  var ir = parseFloat(request.params.ir);
  var irp = parseFloat(request.params.irp);
  var dur = parseFloat(request.params.dur);

  var savings = calcSavingsAdv(isa, d, dp, ir, irp, dur);

  response.writeHead(200, { "Content-Type": "application/json" });
  response.write(JSON.stringify(savings));
  response.end();
});

app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});

function calcSavingsAdv(
  P: number,
  D: number,
  DP: number,
  r: number,
  rp: number,
  t: number
) {
  var xAxis: number[] = [...Array(t + 1).keys()];
  var yAxis: number[] = [P];
  var deposits = P;
  var interest = 0;
  for (var month = 1; month <= t; month++) {
    if (rp > 0) {
      if (month % rp == 0) {
        interest += P * (r / 100);
        P += interest;
      }
    }
    if (DP > 0) {
      if (month % DP == 0) {
        P += D;
        deposits += D;
      }
    }
    yAxis.push(Math.round(P));
  }
  var pie = [Math.round(deposits), Math.round(interest)];
  var output = { x: xAxis, y: yAxis, pie: pie };
  return output;
}
