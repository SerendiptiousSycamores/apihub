const router = require('express').Router();
const axios = require('axios')

router.get('/relatedId', (request, response) => {
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

router.get('/productId', (request, response) => {
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


module.exports = router;