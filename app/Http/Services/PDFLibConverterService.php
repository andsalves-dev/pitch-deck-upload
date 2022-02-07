<?php

namespace App\Http\Services;

use App\Http\Services\Interfaces\PdfConverterServiceInterface;
use Illuminate\Http\UploadedFile;
use ImalH\PDFLib\PDFLib;

class PDFLibConverterService implements PdfConverterServiceInterface {

    public function convertPdfToImages(UploadedFile $pdfFile, string $destDir, array &$images = []): bool {
        try {
            $pdfLib = $this->createPdfLibInstance($pdfFile, $destDir);
            $images = $pdfLib->convert();
            return true;
        } catch (\Exception $e) {
            info('Error loading PDF file: ' . $e->getMessage());
            info('Trace: ' . $e->getTraceAsString());
            return false;
        }
    }

    private function createPdfLibInstance(UploadedFile $pdfFile, string $destDir = ''): PDFLib {
        if (!file_exists($destDir)) {
            mkdir($destDir);
        }

        $pdfLib = new PDFLib();
        $pdfLib->setPdfPath($pdfFile->getPath() . '/' . $pdfFile->getFilename());
        $pdfLib->setOutputPath($destDir);
        $pdfLib->setImageFormat(PDFLib::$IMAGE_FORMAT_PNG);
        $pdfLib->setDPI(300);
        $pdfLib->setPageRange(1, $pdfLib->getNumberOfPages());
        $pdfLib->setFilePrefix('page-');

        return $pdfLib;
    }

}
