# EAPI npoints
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
Sample Request Body
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
Sample Request Body
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

### Products Endpoint
##### Create Product
Sample Request Body
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
##### Put Items To Cart
`POST: /api/v1/cart`
Sample Request Body
```json
{
    "_id": "641ebba699d8328893d6e0ee", 
    "quantity": 8
}
```
##### Check Cart
`GET: /api/v1/cart`

### Shopping
##### Place An Order
`POST: /api/v1/shopping/order`
Sample Request Body
```json
{
    "transactionId": "ABC123ABC"
}
```
##### Check Placed Orders
`GET: /api/v1/shopping/orders`
