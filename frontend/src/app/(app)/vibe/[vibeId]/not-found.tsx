import { EmptyState } from "@/components/ui";
import { Button } from "@/components/ui";
import Link from "next/link";

export default function VibeDetailNotFound() {
  return (
    <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-[50vh]">
      <EmptyState
        title="Vibe not found"
        description="This entertainment experience may have been removed or may not exist."
        action={
          <div className="flex flex-wrap gap-4 mt-2 justify-center">
            <Link href="/dashboard">
              <Button variant="primary">Return to Dashboard</Button>
            </Link>
            <Link href="/generate">
              <Button variant="outline">Generate a New Vibe</Button>
            </Link>
          </div>
        }
      />
    </div>
  );
}
