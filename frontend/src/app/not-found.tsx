import { EmptyState } from "@/components/ui";
import { Button } from "@/components/ui";
import Link from "next/link";

export default function GlobalNotFound() {
  return (
    <div className="flex flex-col min-h-screen bg-[var(--background)] text-foreground items-center justify-center p-4">
      <EmptyState
        title="Page not found"
        description="We couldn't find the page you were looking for. It may have been moved or doesn't exist."
        action={
          <div className="flex flex-wrap gap-4 mt-2 justify-center">
            <Link href="/">
              <Button variant="primary">Return Home</Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="outline">Open Dashboard</Button>
            </Link>
          </div>
        }
      />
    </div>
  );
}
