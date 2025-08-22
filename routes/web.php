<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\BooksController;
use App\Http\Controllers\BookLoansController;
use App\Http\Controllers\CategoriesController;
use App\Http\Controllers\BookCategoryController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    // permissions route
    Route::resource('/permissions', PermissionController::class);
    // roles route
    Route::resource('roles', RoleController::class)->except('show');
    // users route
    Route::resource('/users', UserController::class);
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

     // route mengelola book
    Route::resource('/books', BooksController::class);

    // route mengelola bookloans
    Route::resource('/bookloans', BookLoansController::class);

    // route mengelola categories
    Route::resource('/categories', CategoriesController::class);

     Route::resource('book_categories', BookCategoryController::class);

});

require __DIR__ . '/auth.php';