<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Bloak;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;


class BloakController extends Controller
{
    public function index(Request $request): Response
    {
        $bloak = $request->input('bloak');
        $posts = $bloak->posts()->latest()->take(5)->get();
        return Inertia::render('Bloak/Index',[
            'bloak' => $bloak,
            'posts' => $posts,
        ]);
    }

    public function create(Request $request): Response
    {
        $bloakFromURL = $request->route('url');
        return Inertia::render('Bloak/Create',[
            'bloakFromURL' => $bloakFromURL,
        ]);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'url' => 'required|string|unique:bloaks',
            'name' => 'required|string',
        ]);
        if (Auth::user()->bloak()->exists()) {
            throw ValidationException::withMessages(['error' => 'You already have a bloak.']);
        }
        $bloak = Auth::user()->bloak()->create([
            'url' => $validatedData['url'],
            'name' => $validatedData['name'],
        ]);
        return to_route('homepage');
    }

    public function post(Request $request): Response
    {
        $bloak = $request->input('bloak');
        // Retrieve the post with the given slug within the context of the bloak
        $post = $bloak->posts()->where('slug', $request->route('slug'))->firstOrFail();

        return Inertia::render('Bloak/Post',[
            'bloak' => $bloak,
            'post' => $post,
        ]);
    }
}
