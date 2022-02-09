<?php

namespace App\Http\Controllers;

use App\Http\Services\PDFLibConverterService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Laravel\Lumen\Routing\Controller;

class PitchDeckController extends Controller {
    private PDFLibConverterService $converterService;
    private string $decksBaseDir;

    public function __construct(PDFLibConverterService $converterService) {
        $this->converterService = $converterService;
        $this->decksBaseDir = getcwd() . '/images';
    }

    public function findAll(): JsonResponse {
        return response()->json($this->mapAllPitchDecks());
    }

    public function upload(Request $request): JsonResponse {
        $pitchIdentifier = $request->get('identifier');
        $file = $request->file('file');
        $images = [];
        $success = $this->converterService->convertPdfToImages($file, $this->getDestDir($pitchIdentifier), $images);

        return response()->json(compact('success', 'images'))->setStatusCode($success ? 200 : 500);
    }

    private function getDestDir(string $identifier): string {
        $_identifier = str_replace(' ', '-', $identifier);
        return "$this->decksBaseDir/$_identifier";
    }

    /** Maps each pitch deck identifier to its corresponding images' relative paths */
    private function mapAllPitchDecks(): array {
        $scannedItems = array_diff(scandir($this->decksBaseDir), ['..', '.']);
        $validDirs = array_filter($scannedItems, fn($item) => is_dir($this->getDestDir($item)));
        $pitchDeckMaps = [];

        array_walk($validDirs, function($item) use (&$pitchDeckMaps) {
            $pitchDeckMaps[$item] = array_values(array_map(function($filename) use($item) {
                return "/images/$item/$filename";
            }, array_diff(scandir($this->getDestDir($item)), ['..', '.'])));
        });

        return $pitchDeckMaps;
    }
}
