cd $FORGE_SITE_PATH
git pull origin $FORGE_SITE_BRANCH

$FORGE_COMPOSER install --no-dev --no-interaction --prefer-dist --optimize-autoloader

npm ci
npm run build

if [ -f artisan ]; then
    $FORGE_PHP artisan migrate --force
fi

$FORGE_PHP artisan octane:reload --server frankenphp
