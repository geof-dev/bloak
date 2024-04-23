<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\BloakController;
use App\Http\Middleware\BloakMiddleware;
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
})->name('homepage');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/create/{url?}', [BloakController::class, 'create'])->name('bloak.create');

Route::middleware('auth')->group(function () {
    Route::post('/create', [BloakController::class, 'store'])->name('bloak.store');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

Route::prefix('{url}')->group(function () {
    Route::get('/', [BloakController::class, 'index'])->middleware(BloakMiddleware::class)->name('bloak.index');
    Route::get('/posts', [BloakController::class, 'index'])->middleware(BloakMiddleware::class)->name('bloak.index');
    Route::get('/posts/{slug}', [BloakController::class, 'post'])->middleware(BloakMiddleware::class)->name('bloak.post');
});

/*
Route::get('/{any}', function () {
    return Inertia::render('Errors/404');
})->where('any', '.*');
*/
