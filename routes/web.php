<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\BooksController;
use App\Http\Controllers\BookLoansController;
use App\Http\Controllers\CategoriesController;
use App\Http\Controllers\BookCategoryController;
use App\Http\Controllers\CollectionsController;
use App\Http\Controllers\ReviewController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Public Route
|--------------------------------------------------------------------------
*/
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

/*
|--------------------------------------------------------------------------
| Authenticated Routes
|--------------------------------------------------------------------------
*/

// Ganti dashboard → home
Route::get('/home', function () {
    return Inertia::render('Home');
})->middleware(['auth', 'verified'])->name('home');

Route::middleware('auth')->group(function () {
    // permissions route
    Route::resource('permissions', PermissionController::class);

    // roles route
    Route::resource('roles', RoleController::class)->except('show');

    // users route
    Route::resource('users', UserController::class);

    // profile
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // books
    Route::resource('books', BooksController::class);

    // bookloans
    Route::resource('bookloans', BookLoansController::class);

    // categories
    Route::resource('categories', CategoriesController::class);

    // book_categories
    Route::resource('book_categories', BookCategoryController::class);

    // collections
    Route::resource('collections', CollectionsController::class);

    // reviews
    Route::resource('reviews', ReviewController::class);
});

require __DIR__ . '/auth.php';
