<?php

namespace App\Http\Services\Interfaces;

use Illuminate\Http\UploadedFile;

interface PdfConverterServiceInterface {
    public function convertPdfToImages(UploadedFile $pdfFile, string $destDir, array &$images): bool;
}
