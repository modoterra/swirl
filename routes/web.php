<?php

use Illuminate\Support\Facades\Route;

/**
 * This is the welcome route.
 *
 * It shows an example of how to use the `inertia` function to render a React
 * component.
 *
 * It is possible to pass page properties to the component by passing an array
 * as the second parameter to the function, the first parameter being the
 * filename sans the `.tsx` extension.
 *
 * Additiobally, here we are also using Laravel to create an alias for the
 * root route at `/` and at the same time rendering the `Welcome` component.
 *
 * See `resources/js/app.tsx` for the Inertia app creation. It in that file
 * that it becomes clear how the "Welcome" parameter here is passed along
 * to finally render the `Welcome` component.
 *
 * You can also see how we use the `config` function to read a value from the
 * `config/app.php` file. In Laravel, a config file returns an array, and we
 * use the `config` function and a special dot-notation to read values from
 * it. In this case, we read the `app.env` value and check if it is set to
 * `production`, and if it, we end up passing the boolean `true` as a React
 * property to the `Welcome` component.
 *
 * When you start developing your application, you should remove this route.
 */
Route::get(
  '/',
  static fn() => inertia('welcome', [
    'production' => config('app.env') === 'production'
  ])
)->name('welcome');

/**
 * Swirl
 * If you used the CLI snippet to install Swirl, this is the route that
 * redirected you to the `install.sh` script on GitHub.
 *
 * A couple of things are going on here. First, we define a get route at
 * `/install`, then we use a static closure, and finally, we redirect
 * to a value we retrieve from the environment variables.
 *
 * When you start developing your application, you should remove this route.
 */
Route::get('/install', static fn() => redirect(env('SWIRL_INSTALL_URL')));
