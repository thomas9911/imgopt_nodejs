const { convert } = require("../lib");
const temp = require("temp").track();
var fs = require("fs");

afterEach(() => {
  temp.cleanupSync();
});

test("not exisiting file raises exception", () => {
  expect(() => convert("test", "test")).toThrow("invalid file");
});

test("convert jpg to png works on a real image", (done) => {
  temp.open({ suffix: ".png" }, function (err, info) {
    if (err) {
      done(err);
    }
    try {
      // convert image
      expect(() =>
        convert("./tests/data/pexels-abet-llacer-919734.jpg", info.path)
      ).not.toThrow();

      // check image
      fs.open(info.path, "r", function (status, fd) {
        if (status) {
          done(status.message);
        }
        var buffer = Buffer.alloc(100);
        fs.read(fd, buffer, 0, 100, 0, function (err, num) {
          if (buffer.toString("utf8", 1, 4) !== "PNG") {
            done("invalid output image");
          }
        });
      });

      done();
    } catch (error) {
      done(error);
    }
  });
}, 30000);
