<?php

namespace App\Http\Controllers;

use App\Models\Collection;
use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;

class CollectionsController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        return [
            new Middleware('permission:collections index', only: ['index']),
            new Middleware('permission:collections create', only: ['create', 'store']),
            new Middleware('permission:collections delete', only: ['destroy']),
        ];
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $collections = Collection::with('book')
            ->where('user_id', auth()->id())
            ->when($request->search, fn($query) =>
                $query->whereHas('book', fn($q) =>
                    $q->where('title', 'like', '%' . $request->search . '%')
                )
            )
            ->latest()
            ->paginate(6)
            ->withQueryString();

        return inertia('Collections/Index', [
            'collections' => $collections,
            'filters' => $request->only(['search'])
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Collections/Create', [
            'books' => Book::select('id', 'title')->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'book_id' => 'required|exists:books,id'
        ]);

        Collection::create([
            'user_id' => auth()->id(),
            'book_id' => $request->book_id,
        ]);

        return to_route('collections.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Collection $collection)
    {
        if ($collection->user_id !== auth()->id()) {
            abort(403);
        }

        $collection->delete();

        return back();
    }
}
