<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class PitchDeckUploadValidatorMiddleware {
    /** Handle an incoming request */
    public function handle(Request $request, Closure $next) {
        if (!$request->hasFile('file')) {
            return response()->json(['error' => "'file' not provided for upload"])->setStatusCode(422);
        }

        if (!$request->has('identifier')) {
            return response()->json(['error' => "'identifier' not provided for upload"])->setStatusCode(422);
        }

        if (!preg_match('/^[a-z0-9\s]+$/i', $request->get('identifier'))) {
            return response()->json([
                'error' => "'identifier' has an invalid format. Can only contain letters, numbers and spaces."
            ])->setStatusCode(422);
        }

        return $next($request);
    }
}
