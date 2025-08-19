<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;

class BooksController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        return [
            new Middleware('permission:books index', only: ['index']),
            new Middleware('permission:books create', only: ['create', 'store']),
            new Middleware('permission:books edit', only: ['edit', 'update']),
            new Middleware('permission:books delete', only: ['destroy']),
        ];
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $books = Book::select('id', 'title', 'author', 'publisher', 'year')
            ->when($request->search, fn($q) => $q->where('title', 'like', '%' . $request->search . '%'))
            ->latest()
            ->paginate(6)
            ->withQueryString();

        return inertia('Books/Index', [
            'books'   => $books,
            'filters' => $request->only(['search'])
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Books/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title'     => 'required|string|max:255',
            'author'    => 'required|string|max:255',
            'publisher' => 'required|string|max:255',
            'year'      => 'required|digits:4|integer|min:1500|max:' . date('Y'),
        ]);

        Book::create($request->all());

        return redirect()->route('books.index')->with('success', 'Buku berhasil ditambahkan.');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Book $book)
    {
        return inertia('Books/Edit', [
            'book' => $book,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Book $book)
    {
        $request->validate([
            'title'     => 'required|string|max:255',
            'author'    => 'required|string|max:255',
            'publisher' => 'required|string|max:255',
            'year'      => 'required|digits:4|integer|min:1500|max:' . date('Y'),
        ]);

        $book->update($request->all());

        return redirect()->route('books.index')->with('success', 'Buku berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Book $book)
    {
        $book->delete();

        return back()->with('success', 'Buku berhasil dihapus.');
    }
}
