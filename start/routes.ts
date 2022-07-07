/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'

/*Route.get('/', async ({ view }) => {
  return view.render('welcome')
})*/

Route.group(() =>{
  Route.get('/updateF/:id', 'UsersController.updateForm').as('updateF')
  Route.post('/update/:id', 'UsersController.update').as('update')

  Route.post('/delete/:id/', 'UsersController.delete').as('delete')
  Route.get('logout', 'AuthController.logout').as('logout')
  Route.post('create/:id', 'UsersController.create').as('create')
  Route.get('/all', 'UsersController.all').as('all')
}).middleware('auth')

Route.get('/show/:id', 'UsersController.show').as('show')
Route.get('/', 'UsersController.home').as('home')
Route.get('register', 'AuthController.registerForm').as('auth.register')
Route.get('login', 'AuthController.loginForm').as('auth.login')
Route.post('register', 'AuthController.register').as('register')
Route.post('login', 'AuthController.login').as('login')




