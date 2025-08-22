<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;

class CategoriesController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        return [
            new Middleware('permission:categories index', only: ['index']),
            new Middleware('permission:categories create', only: ['create', 'store']),
            new Middleware('permission:categories edit', only: ['edit', 'update']),
            new Middleware('permission:categories delete', only: ['destroy']),
        ];
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // get categories
        $categories = Category::select('id', 'category')
            ->when($request->search, fn($query) =>
                $query->where('category', 'like', '%' . $request->search . '%')
            )
            ->latest()
            ->paginate(6)
            ->withQueryString();

        // render view
        return inertia('Categories/Index', [
            'categories' => $categories,
            'filters' => $request->only(['search'])
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // render view
        return inertia('Categories/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // validate request
        $request->validate([
            'category' => 'required|min:3|max:255|unique:categories'
        ]);

        // create new category
        Category::create([
            'category' => $request->category
        ]);

        return to_route('categories.index');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        // render view
        return inertia('Categories/Edit', [
            'category' => $category
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Category $category)
    {
        // validate request
        $request->validate([
            'category' => 'required|min:3|max:255|unique:categories,category,' . $category->id
        ]);

        // update category
        $category->update([
            'category' => $request->category
        ]);

        return to_route('categories.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        // delete category
        $category->delete();

        return back();
    }
}
