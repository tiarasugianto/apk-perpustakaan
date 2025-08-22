<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Category;
use App\Models\BookCategory;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;

class BookCategoryController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        return [
            new Middleware('permission:book_categories index', only: ['index']),
            new Middleware('permission:book_categories create', only: ['create', 'store']),
            new Middleware('permission:book_categories edit', only: ['edit', 'update']),
            new Middleware('permission:book_categories delete', only: ['destroy']),
        ];
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $filters = $request->only('search');

        $bookCategories = \App\Models\BookCategory::query()
            ->with(['book', 'category']) // kalau mau relasi ditampilkan
            ->when($filters['search'] ?? null, function ($query, $search) {
                $query->whereHas('book', function ($q) use ($search) {
                    $q->where('title', 'like', "%{$search}%");
                })->orWhereHas('category', function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%");
                });
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return inertia('BookCategories/Index', [
            'book_categories' => $bookCategories,
            'filters' => $filters,
        ]);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('BookCategories/Create', [
            'books' => Book::select('id', 'title')->get(),
            'categories' => Category::select('id', 'category')->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'book_id' => 'required|exists:books,id',
            'category_id' => 'required|exists:categories,id',
        ]);

        BookCategory::create([
            'book_id' => $request->book_id,
            'category_id' => $request->category_id,
        ]);

        return to_route('book_categories.index');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(BookCategory $bookCategory)
    {
        return inertia('BookCategories/Edit', [
            'bookCategory' => $bookCategory->load(['book:id,title', 'category:id,category']),
            'books' => Book::select('id', 'title')->get(),
            'categories' => Category::select('id', 'category')->get(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, BookCategory $bookCategory)
    {
        $request->validate([
            'book_id' => 'required|exists:books,id',
            'category_id' => 'required|exists:categories,id',
        ]);

        $bookCategory->update([
            'book_id' => $request->book_id,
            'category_id' => $request->category_id,
        ]);

        return to_route('book_categories.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(BookCategory $bookCategory)
    {
        $bookCategory->delete();

        return back();
    }
}
