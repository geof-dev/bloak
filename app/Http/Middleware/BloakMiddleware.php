<?php

namespace App\Http\Middleware;

use App\Models\Bloak;
use Closure;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

class BloakMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        try {
            $url = $request->route('url');
            $bloak = Bloak::where('url', $url)->firstOrFail();
            $request->merge([
                'bloak' => $bloak
            ]);
        } catch (ModelNotFoundException $e) {
            $url = $request->route('url');
            // Handle the case where Bloak model is not found
            return Inertia::render('Errors/404', [
                'url' => $url
            ])->toResponse($request);
        }

        return $next($request);
    }
}
