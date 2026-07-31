import { createFileRoute } from "@tanstack/react-router";
import { VotingCard } from "@/components/voting/voting";

export const Route = createFileRoute("/_votes/vote")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="relative flex min-h-svh w-full items-center justify-center p-6 md:p-10 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat blur-[3px]"
        style={{
          backgroundImage: "url('/ngt5.webp')",
        }}
      />
      <div className="absolute inset-0 bg-black/70" />
      <div className="relative w-[90vw] max-w-[1600px] z-10">
        <VotingCard />
      </div>
    </div>
  );
}
