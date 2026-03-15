import { createFileRoute } from '@tanstack/react-router'
import { Button } from 'workspaces/ui'

export const Route = createFileRoute('/')({ component: App })

function App() {
  return <Button>Click me!</Button>
}
