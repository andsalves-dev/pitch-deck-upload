<?php

namespace App\Providers;

use App\Http\Services\PDFLibConverterService;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider {

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register() {
        $this->app->singleton(PDFLibConverterService::class, function() {
            return new PDFLibConverterService();
        });
    }
}
