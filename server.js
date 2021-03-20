const express = require('express')
const app = express()
const port = 3001
const axios = require('axios')

app.use(express.json())

app.get('/products/productId', (request, response) => {
  var data = [];
  // var productId = request.params
  var productId = 1
  axios.get('http://localhost:3000/products/productId', {
    params: {
      productId: 1
    }
  })
  .then((res) => {
    data.push(res.data)
    axios.get('http://localhost:3000/products/productId/styles', {
      params: {
        productId: 1
      }
    })
    .then((res) => {
      data.push(res.data)
      response.send(data)
    })
    .catch((err) =>  {
      console.log(err)
      response.sendStatus(404)
    });
  })
  .catch((err) =>  {
    console.log(err)
    response.sendStatus(404)
  });
});

app.get('/products/relatedId', (request, response) => {
  // var productId = request.params
  var productId = 1
  axios.get('http://localhost:3000/products/productId/related', {
    params: {
      productId: 1
    }
  })
  .then((res) => {
    response.send(res.data);
  })
  .catch((err) => {
    console.log(err)
    response.sendStatus(404);
  });
})

app.get('/questions', (request, response) => {
  axios.get('http:localhost:3000/qa/questions', {
    params: {
      product_id: `${productId}`,
    },
  })
    .then((res) => {
      response.send(res.data);
    })
    .catch(() => {
      response.sendStatus('404');
    });
})

app.post('/questions', (request, response) => {
  axios.post('http:localhost:3000/qa/questions',
    request.body)
  .then((result) => {
    console.log('post question success');
    response.sendStatus(201);
  })
  .catch((error) => {
    response.sendStatus(404);
  });
})

app.get('/answers', (request, response) => {
  axios.get('http:localhost:3000/questions/84310/answers')
    .then((res) => {
      response.send(res.data);
    })
    .catch((error) => {
      response.sendStatus(404);
    });
})

app.post('/answers', (request, response) => {
  const { body, name, email, questionId, photos } = req.body;
  const answerHeaders = {
    question_id: questionId,
  };
  axios.post('http://localhost:3000/questions/84310/answers', req.body)
  .then(() => {
    response.sendStatus(201);
  })
  .catch((error) => {
    response.sendStatus(404);
  });
})

app.get('/reviews', (request, response) => {
  const { productId, page, sort } = req.query;
  axios.get('http://localhost:3000/reviews', {
    params: {
      product_id: `${productId}`,
      count: 100,
      page: `${page}`,
      sort: `${sort}`,
    }
  })
})

app.post('/reviews', (request, response) => {
  axios.post('http://localhost:3000/reviews', req.body, {
    params: {
      product_id: request.body.product_id,
    }
  })
  .then((res) => {
    response.sendStatus(201);
  })
  .catch((error) => {
    response.sendStatus(404);
  });
})


app.put('/reviews', (request, response) => {
  axios.put(`http://localhost:3000/reviews/${request.body.reviewId}/helpful`, {})
    .then((res) => {
      response.sendStatus(204);
    })
    .catch((error) => {
      response.sendStatus(404);
    });
})

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})