# Multiparser

How to use:
Add multiparser.js into your project.
Install formidable. -> npm install formidable --save

```
  const MultiParser = require("./config/multiparser");
  const app = express();
  app.use(MultiParser());
  app.use(bodyParser.json({limit: '150mb'}));
  app.use(bodyParser.urlencoded({extended: false, limit: '150mb'}));
```

This parser insert into req.body the data of multipart/form-data & multipart/alternative requests.

