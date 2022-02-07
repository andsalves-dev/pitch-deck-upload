<?php

/** @var Router $router */

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

use Laravel\Lumen\Routing\Router;
use App\Http\Middleware\PitchDeckUploadValidatorMiddleware;

$router->get('/', function () use ($router) {
    return $router->app->version();
});

$router->get('/pitch-decks', ['uses' => 'PitchDeckController@findAll']);

$router->post('/pitch-decks/upload', [
    'middleware' => PitchDeckUploadValidatorMiddleware::class,
    'uses' => 'PitchDeckController@upload',
]);
