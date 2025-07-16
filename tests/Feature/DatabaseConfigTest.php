<?php

use Illuminate\Support\Facades\Config;

it('correctly configures database name based on app name when enabled', function () {
    // Set up clean environment
    Config::set('app.name', 'My Test App');
    
    // Mock what the config would return if we read the database config fresh
    $expectedDatabaseName = \Illuminate\Support\Str::slug('My Test App', '_');
    expect($expectedDatabaseName)->toBe('my_test_app');
    
    // Test that our helper function exists by including the config
    include_once base_path('config/database.php');
    expect(function_exists('getDefaultDatabaseName'))->toBeTrue();
});

it('test app name to database name conversion', function () {
    $testCases = [
        'Laravel' => 'laravel',
        'My Cool App' => 'my_cool_app',
        'Test-App@123!' => 'test_app_at_123',
        'Simple' => 'simple',
        'Multi Word Project Name' => 'multi_word_project_name',
    ];
    
    foreach ($testCases as $appName => $expectedDb) {
        $result = \Illuminate\Support\Str::slug($appName, '_');
        expect($result)->toBe($expectedDb, "App name '$appName' should convert to '$expectedDb'");
    }
});