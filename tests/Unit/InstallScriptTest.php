<?php

test('install script includes database migration command', function () {
    $installScript = file_get_contents(__DIR__ . '/../../install.sh');
    
    expect($installScript)
        ->toContain('php artisan migrate --force')
        ->toContain('Running database migrations...');
});

test('migration command is placed after key generation', function () {
    $installScript = file_get_contents(__DIR__ . '/../../install.sh');
    
    $keyGeneratePos = strpos($installScript, 'php artisan key:generate');
    $migratePos = strpos($installScript, 'php artisan migrate --force');
    
    expect($migratePos)->toBeGreaterThan($keyGeneratePos);
});

test('migration command is within dependency installation block', function () {
    $installScript = file_get_contents(__DIR__ . '/../../install.sh');
    
    // Find the NO_DEPS check and ensure migrate is within that block
    $noDepsStart = strpos($installScript, 'if [ $NO_DEPS -eq 0 ]; then');
    $noDepsEnd = strpos($installScript, 'fi', $noDepsStart);
    $migratePos = strpos($installScript, 'php artisan migrate --force');
    
    expect($migratePos)
        ->toBeGreaterThan($noDepsStart)
        ->toBeLessThan($noDepsEnd);
});