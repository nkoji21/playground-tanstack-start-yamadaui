import { HeadContent, Scripts, createRootRoute } from "@tanstack/react-router"
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools"
import { TanStackDevtools } from "@tanstack/react-devtools"

import { ColorModeScript, UIProvider } from "@workspaces/ui"
import { createServerFn } from "@tanstack/react-start"
import { getRequestHeader } from "@tanstack/react-start/server"
import { config } from "@workspaces/theme"

const getCookie = createServerFn({ method: "GET" }).handler(async () => {
  return getRequestHeader("cookie") ?? ""
})

export const Route = createRootRoute({
  loader: async () => ({
    cookie: await getCookie(),
  }),
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "TanStack Start Starter",
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  const { cookie } = Route.useLoaderData()

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body suppressHydrationWarning>
        <ColorModeScript type="cookie" defaultValue={config.defaultColorMode} />

        <UIProvider config={config} cookie={cookie}>
          {children}
          <TanStackDevtools
            config={{
              position: "bottom-right",
            }}
            plugins={[
              {
                name: "Tanstack Router",
                render: <TanStackRouterDevtoolsPanel />,
              },
            ]}
            />
          <Scripts />
        </UIProvider>
      </body>
    </html>
  )
}