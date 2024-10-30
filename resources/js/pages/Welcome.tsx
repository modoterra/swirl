import { DiscordLogoIcon, GitHubLogoIcon, LinkedInLogoIcon, TwitterLogoIcon } from '@radix-ui/react-icons'
import { useCopyToClipboard } from '@uidotdev/usehooks'
import { Construction, Copy, Library, Section } from 'lucide-react'
import { FC, MouseEvent as ReactMouseEvent, useRef } from 'react'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

type WelcomeProps = {
  production: boolean
}

const Welcome: FC<WelcomeProps> = ({ production }) => {
  const installScriptRef = useRef<HTMLPreElement>(null)
  const [_, copyInstallScript] = useCopyToClipboard()

  const displayPartyEmoji = (event: ReactMouseEvent<SVGSVGElement, MouseEvent>) => {
    const emoji = document.createElement('div')
    emoji.innerText = '🎉'
    emoji.style.position = 'absolute'
    emoji.style.pointerEvents = 'none'
    emoji.style.left = `${event.clientX + window.scrollX}px`
    emoji.style.top = `${event.clientY + window.scrollY}px`

    const animation = emoji.animate(
      [
        { transform: 'scale(1)', opacity: '1' },
        { transform: 'scale(8)', opacity: '0' }
      ],
      {
        duration: 1000,
        easing: 'cubic-bezier(.88, .22, .32, .80)'
      }
    )

    animation.finished.then(() => emoji.remove())
    document.body.appendChild(emoji)
  }

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col items-center">
        <h1 className="my-16 bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 bg-clip-text text-6xl font-black italic tracking-tighter text-transparent">
          SWIRL
        </h1>
        <div className="flex flex-col items-center gap-4 md:flex-row md:items-start">
          <div className="flex flex-grow flex-col gap-8 text-lg font-medium text-gray-800">
            <p className="text-4xl font-extrabold tracking-tighter">Hello.</p>
            <p>Welcome to an opinionated, curated and minimalist application starter.</p>
            <p>
              If you are looking to build a modern web based application using a tested and tried foundation, maintained
              by professionals, then SWIRL can help you.
            </p>
            <p>However, it doesn't stop there. SWIRL comes with batteries included.</p>
            <p>
              Access state-of-the-art user interfaces components with{' '}
              <span className="font-bold text-black">shadcn/ui</span>. Unlock the power of CSS using{' '}
              <span className="font-bold text-sky-400">Tailwind CSS</span>. Use{' '}
              <span className="font-bold text-black">Inertia</span>, to bridge a leading user interface library in{' '}
              <span className="font-bold text-[#087ea4]">React</span>, with the unparalled power of{' '}
              <span className="font-bold text-[rgb(234,68,50)]">Laravel</span>.
            </p>
            {production ? (
              <div className="mx-auto flex items-center rounded-lg border bg-muted p-4">
                <pre className="mr-4">
                  <code className="hidden lg:block" ref={installScriptRef}>
                    sh -c "$(curl -fsSL https://swirl.mdtrr.com/install)"
                  </code>
                  <code className="block lg:hidden">Copy Install Script →</code>
                </pre>
                <Copy
                  className="h-8 w-8 cursor-pointer rounded-lg p-2 transition-colors hover:bg-gray-200"
                  onClick={async event =>
                    (await copyInstallScript(installScriptRef?.current?.innerText!)) ?? displayPartyEmoji(event)
                  }
                />
              </div>
            ) : (
              <>
                <Separator />
                <div className="flex flex-col items-center lg:flex-row">
                  <Construction className="mx-12 my-4 h-24 w-24 flex-none text-red-500" />
                  <p>
                    It looks like you have recently installed SWIRL and you are running in development in mode. Now, the
                    most important thing to understand is that SWIRL in itself is nothing more than a preconfigured
                    Laravel application.
                  </p>
                </div>
                <p>
                  However, that word, <span className="italic">preconfigured</span> means a lot more than you might
                  think. SWIRL brings a lot of things to the table, and it is important to understand what they are and
                  what they can do. Before you get started building the next great thing, please take your time
                  familiarize yourself with our documentation.
                </p>
                <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
                  <Button asChild size="lg" className="w-full md:w-auto">
                    <a href="https://github.com/modoterra/swirl/wiki/Documentation">Documentation</a>
                  </Button>
                  <Button asChild size="lg" variant="secondary" className="w-full md:w-auto">
                    <a href="https://github.com/modoterra/swirl/blob/stable/README.md">README</a>
                  </Button>
                  <Button asChild size="lg" variant="secondary" className="w-full md:w-auto">
                    <a href="https://github.com/modoterra/swirl/blob/stable/LICENSE.md">LICENSE</a>
                  </Button>
                </div>
              </>
            )}
          </div>
          <div className="mt-16 flex w-64 flex-none flex-col items-center gap-8 md:mt-0">
            <div className="flex items-center justify-center gap-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button size="icon" variant="outline" className="shadow-md" asChild>
                      <a href="https://github.com/modoterra/swirl/wiki/Documentation">
                        <Library />
                      </a>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Documentation</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <Button size="icon" variant="outline" className="shadow-md" asChild>
                <a href="https://github.com/modoterra/swirl">
                  <GitHubLogoIcon />
                </a>
              </Button>
              <Button size="icon" variant="outline" className="shadow-md" disabled>
                <LinkedInLogoIcon />
              </Button>
              <Button size="icon" variant="outline" className="shadow-md" disabled>
                <TwitterLogoIcon />
              </Button>
              <Button size="icon" variant="outline" className="shadow-md" disabled>
                <DiscordLogoIcon />
              </Button>
            </div>
            <ul className="flex flex-col items-center">
              <li>
                <div className="flex items-center gap-1">
                  <img src="/logos/shadcn-ui.svg" alt="shadcn/ui" className="h-4" />
                  <p className="text-lg font-bold">shadcn/ui</p>
                </div>
              </li>
              <li className="mt-7">
                <img src="/logos/tailwindcss.svg" className="h-4" alt="tailwindcss" />
              </li>
              <li className="mt-8">
                <svg className="block h-4 fill-current text-black" viewBox="0 0 275.3 50.5">
                  <path d="M231.2 16.1h-17.8l17.2 17.2-17.2 17.2h17.8l17.2-17.2z"></path>
                  <path d="M258.1 16.1h-17.8l17.2 17.2-17.2 17.2h17.8l17.2-17.2z"></path>
                  <path d="M6 15.3h10.3l-6 34.2H0l6-34.2zm.6-9.1C7.2 2.9 10.3 0 13.7 0s5.7 2.8 5.2 6.2c-.5 3.4-3.7 6.2-7.2 6.2s-5.6-3-5.1-6.2zM54.3 28.5l-3.7 21H40.4L43.8 30c.8-4.4-1.6-6.2-4.9-6.2-3.4 0-6.5 2-7.5 6.6L28 49.5H17.8l6-34.2h10.3l-.5 3.2c2.3-2.6 6.2-4.2 10.1-4.2 6.9.1 12.2 5.1 10.6 14.2zM94.5 32.4c-.1.8-.5 2.7-1.1 4.1H68.9c.6 3.8 3.8 4.8 7 4.8 2.9 0 5.2-.8 7.2-2.7l7.2 5.9c-4 4-8.7 6-15 6-11.8 0-18-8.5-16.3-18.7a20.7 20.7 0 0 1 20.5-17.4c9.8 0 16.9 7.6 15 18zm-9.7-3.7c-.3-3.8-3-5.3-6.2-5.3a8.9 8.9 0 0 0-8.3 5.3h14.5zM123.9 14.6l-2 11.6c-4-.6-10.5.8-11.7 7.8l.1-.4-2.8 15.9H97.3l6-34.2h10.3l-1.1 6.2c2.1-4.7 6.6-6.9 11.4-6.9zM137.8 37.3c-.5 3.1 2 3.3 6.6 2.9l-1.6 9.3c-12.3 1.4-16.9-2.7-15.2-12.2l2.1-12.1h-5.5l1.8-9.9h5.4l1.2-6.5 10.8-3.1-1.7 9.6h7.1l-1.8 9.9h-7l-2.2 12.1zM155.3 15.3h10.3l-6 34.2h-10.3l6-34.2zm.6-9.1c.5-3.3 3.7-6.2 7.1-6.2s5.7 2.8 5.2 6.2c-.5 3.4-3.7 6.2-7.2 6.2s-5.7-3-5.1-6.2zM208.1 15.3l-6 34.2h-10.3l.4-2.3a15.5 15.5 0 0 1-10.3 3.3c-11.1 0-15.3-9.6-13.5-18.9 1.6-8.8 8.6-17.2 19.2-17.2 4.5 0 7.7 1.8 9.6 4.6l.6-3.6h10.3zm-13.2 17.2c.9-5.2-1.9-8.4-6.6-8.4a9.5 9.5 0 0 0-9.5 8.3c-.9 5.1 1.8 8.3 6.6 8.3 4.6.1 8.6-3.1 9.5-8.2z"></path>
                </svg>
              </li>
              <li className="mt-8 flex items-center gap-1">
                <svg
                  viewBox="-10.5 -9.45 21 18.9"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 text-sm text-[#087ea4]"
                >
                  <circle cx="0" cy="0" r="2" fill="currentColor"></circle>
                  <g stroke="currentColor" strokeWidth="1" fill="none">
                    <ellipse rx="10" ry="4.5"></ellipse>
                    <ellipse rx="10" ry="4.5" transform="rotate(60)"></ellipse>
                    <ellipse rx="10" ry="4.5" transform="rotate(120)"></ellipse>
                  </g>
                </svg>
                <p className="text-lg font-semibold">React</p>
              </li>
              <li className="mt-4">
                <img src="/logos/laravel.svg" alt="Laravel" className="h-12" />
              </li>
              <li className="mt-4 text-lg font-black uppercase italic tracking-tighter underline decoration-2">
                &amp; lots of friends.
              </li>
              <li className="flex p-4 text-muted-foreground">
                <Section className="m-2 h-4 w-4 flex-none" />
                <p className="text-sm italic tracking-tighter">
                  All trademarks, logos, and brand names are the property of their respective owners. Use of these does
                  not imply endorsement or affiliation.
                </p>
              </li>
            </ul>
          </div>
        </div>
        <footer className="mb-4 mt-16 text-sm text-gray-500">
          &copy; {new Date(Date.now()).getFullYear()} Modoterra Corporation. All rights reserved.{' '}
        </footer>
      </div>
    </div>
  )
}

export default Welcome
