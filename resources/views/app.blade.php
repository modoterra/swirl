<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
    <title>SWIRL</title>
    @vite('resources/js/app.tsx')
    @inertiaHead
    <link rel="preload" href="https://rsms.me/inter/inter.css" as="style" />
    <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
  </head>
  <body class="font-sans antialiased">
    @inertia
  </body>
</html>
