import { Button } from '@/components/ui/button'

const Welcome = () => {
  return (
    <div className="container mx-auto flex min-h-screen flex-col items-center justify-center px-4 py-12">
      <img src="/logo.png" alt="Swirl Logo" className="mb-8 h-32 w-32" />
      <h1 className="mb-4 text-5xl font-black tracking-tight">Swirl</h1>
      <p className="mb-8 max-w-xl text-center text-lg">
        Swirl is a modern, minimalist application starter powered by shadcn/ui, Tailwind CSS, Inertia, React, and
        Laravel. It provides a curated, batteries-included foundation for building robust web applications.
      </p>
      <div className="mb-8 flex flex-wrap justify-center gap-4">
        <a
          href="https://ui.shadcn.com"
          className="rounded bg-gray-100 px-4 py-2 font-semibold hover:bg-gray-200"
          target="_blank"
          rel="noopener noreferrer"
        >
          shadcn/ui
        </a>
        <a
          href="https://tailwindcss.com"
          className="rounded bg-sky-100 px-4 py-2 font-semibold text-sky-700 hover:bg-sky-200"
          target="_blank"
          rel="noopener noreferrer"
        >
          Tailwind
        </a>
        <a
          href="https://inertiajs.com"
          className="rounded bg-purple-100 px-4 py-2 font-semibold text-purple-700 hover:bg-purple-200"
          target="_blank"
          rel="noopener noreferrer"
        >
          Inertia
        </a>
        <a
          href="https://react.dev"
          className="rounded bg-blue-100 px-4 py-2 font-semibold text-blue-700 hover:bg-blue-200"
          target="_blank"
          rel="noopener noreferrer"
        >
          React
        </a>
        <a
          href="https://laravel.com"
          className="rounded bg-red-100 px-4 py-2 font-semibold text-red-700 hover:bg-red-200"
          target="_blank"
          rel="noopener noreferrer"
        >
          Laravel
        </a>
      </div>
      <a href="https://github.com/modoterra/swirl/wiki" target="_blank" rel="noopener noreferrer" className="mb-8">
        <Button variant="link">Visit the Wiki</Button>
      </a>
      <div className="mt-8 flex items-center justify-center">
        <p className="text-muted-foreground max-w-lg text-center text-xs italic">
          All trademarks, logos, and brand names are the property of their respective owners. Use of these does not
          imply endorsement or affiliation.
        </p>
      </div>
      <footer className="mt-8 text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Modoterra Corporation. All rights reserved.
      </footer>
    </div>
  )
}

export default Welcome
