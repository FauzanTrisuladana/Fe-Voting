import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_votes/vote')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_vote/vote"!</div>
}
