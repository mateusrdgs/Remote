require('./api/config/database');

const express = require('express'),
      helmet = require('helmet'),
      bodyParser  = require('body-parser'),
      morgan = require ('morgan')
      cors = require('cors'),
      routes = require('./api/routes/index'),
      port = 3000,
      app = express();

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false }));

app.use('/api', routes);

app.listen(port || process.env.PORT, () => console.log(`Express listening on port ${port}`));