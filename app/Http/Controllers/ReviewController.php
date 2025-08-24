<?php

namespace App\Http\Controllers;

use App\Models\Review;
use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;

class ReviewController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        return [
            new Middleware('permission:reviews index', only: ['index']),
            new Middleware('permission:reviews create', only: ['create', 'store']),
            new Middleware('permission:reviews edit', only: ['edit', 'update']),
            new Middleware('permission:reviews delete', only: ['destroy']),
        ];
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $reviews = Review::with(['user:id,name', 'book:id,title'])
            ->when($request->search, function ($query) use ($request) {
                $query->where('review', 'like', '%' . $request->search . '%')
                      ->orWhereHas('book', fn($q) =>
                          $q->where('title', 'like', '%' . $request->search . '%')
                      )
                      ->orWhereHas('user', fn($q) =>
                          $q->where('name', 'like', '%' . $request->search . '%')
                      );
            })
            ->latest()
            ->paginate(6)
            ->withQueryString();

        return inertia('Reviews/Index', [
            'reviews' => $reviews,
            'filters' => $request->only(['search'])
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $books = Book::select('id', 'title')->get();

        return inertia('Reviews/Create', [
            'books' => $books,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'book_id' => 'required|exists:books,id',
            'review'  => 'nullable|string',
            'rating'  => 'required|integer|min:1|max:5',
        ]);

        Review::create([
            'user_id' => Auth::id(),
            'book_id' => $request->book_id,
            'review'  => $request->review,
            'rating'  => $request->rating,
        ]);

        return to_route('reviews.index');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Review $review)
    {
        $books = Book::select('id', 'title')->get();

        return inertia('Reviews/Edit', [
            'review' => $review,
            'books'  => $books,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Review $review)
    {
        $request->validate([
            'book_id' => 'required|exists:books,id',
            'review'  => 'nullable|string',
            'rating'  => 'required|integer|min:1|max:5',
        ]);

        $review->update([
            'book_id' => $request->book_id,
            'review'  => $request->review,
            'rating'  => $request->rating,
        ]);

        return to_route('reviews.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Review $review)
    {
        $review->delete();

        return back();
    }
}
