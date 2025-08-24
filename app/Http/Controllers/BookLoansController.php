<?php

namespace App\Http\Controllers;

use App\Models\BookLoan;
use App\Models\Book;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;

class BookLoansController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        return [
            new Middleware('permission:bookloans index', only: ['index']),
            new Middleware('permission:bookloans create', only: ['create', 'store']),
            new Middleware('permission:bookloans edit', only: ['edit', 'update']),
            new Middleware('permission:bookloans delete', only: ['destroy']),
        ];
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $bookloans = Bookloan::with(['user:id,name', 'book:id,title'])
            ->select('id', 'user_id', 'book_id', 'date_loan', 'date_return', 'state')
            ->when($request->search, function ($q) use ($request) {
                $q->whereHas('user', fn($u) => $u->where('name', 'like', '%' . $request->search . '%'))
                  ->orWhereHas('book', fn($b) => $b->where('title', 'like', '%' . $request->search . '%'));
            })
            ->latest()
            ->paginate(6)
            ->withQueryString();

        return inertia('BookLoans/Index', [
            'bookloans' => $bookloans,
            'filters'   => $request->only(['search']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('BookLoans/Create', [
            'users' => User::select('id', 'name')->get(),
            'books' => Book::select('id', 'title')->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'user_id'     => 'required|exists:users,id',
            'book_id'     => 'required|exists:books,id',
            'date_loan'   => 'required|date',
            'date_return' => 'nullable|date|after_or_equal:date_loan',
            'state'       => 'required|in:dipinjam,dikembalikan,terlambat',
        ]);

        BookLoan::create($request->all());

        return redirect()->route('bookloans.index')->with('success', 'Peminjaman berhasil ditambahkan.');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(BookLoan $bookloan)
    {
        return inertia('BookLoans/Edit', [
            'bookloan' => $bookloan->load('user:id,name', 'book:id,title'),
            'users'    => User::select('id', 'name')->get(),
            'books'    => Book::select('id', 'title')->get(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, BookLoan $bookloan)
    {
        $request->validate([
            'user_id'     => 'required|exists:users,id',
            'book_id'     => 'required|exists:books,id',
            'date_loan'   => 'required|date',
            'date_return' => 'nullable|date|after_or_equal:date_loan',
            'state'       => 'required|in:dipinjam,dikembalikan,terlambat',
        ]);

        $bookloan->update($request->all());

        return redirect()->route('bookloans.index')->with('success', 'Peminjaman berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(BookLoan $bookloan)
    {
        $bookloan->delete();

        return back()->with('success', 'Peminjaman berhasil dihapus.');
    }
}
