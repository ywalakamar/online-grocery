# API Endpoints
### Customers
##### Register Customer
`POST: /api/v1/customers/signup`
Sample Request Body
```json
{
    "email":"shopper@shopmat.com", 
    "password":"crazyshopper", 
    "phone":"0100654321"
}
```
`POST: /api/v1/customers/address`
```json
{
    "street":"Kenyatta Avenue", 
    "postalCode":"20100", 
    "city":"Nairobi", 
    "country":"Kenya"
}
```
##### Customer Login
`POST: /api/v1/customers/login`
```json
{
    "email":"shopper@shopmat.com", 
    "password":"crazyshopper", 
}
```
##### Get All Customers
`GET: /api/v1/customers`

##### Check Customer Profile
`GET: /api/v1/customers/profile`
##### Get Customer Orders
`GET: /api/v1/customers/orders`

### Products
##### Create Product
`POST: /api/v1/products`
```json
{
    "name":"Festive Bread", 
    "desc":"Finest fresh harvest brownbread in town", 
    "banner":"www.bread.com",
    "type":"Foods",
    "unit":1,
    "price":60,
    "available":true,
    "supplier":"United Millers"
}
```
##### Fetch Products
`GET: /api/v1/products`
##### Fetch One Product
`GET: /api/v1/products/:id`
##### Add Item To Cart
`PUT: /api/v1/cart`
```json
{
    "_id": "641ebba699d8328893d6e0ee", 
    "quantity": 8
}
```
##### Check Cart Items
`GET: /api/v1/cart`

### Shopping
##### Place An Order
`POST: /api/v1/shopping/order`
```json
{
    "transactionId": "ABC123ABC"
}
```
##### Check Placed Orders
`GET: /api/v1/shopping/orders`
