const express = require(express);
const cors = require("cors");
const app = express();

app.use(cors());

app.use(static(__dirname + "/public"));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

app.listen(8080, () => console.log("Listening on port 8080!"));