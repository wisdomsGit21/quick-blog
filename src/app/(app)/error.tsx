// app/error.tsx
"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, RefreshCcw } from "lucide-react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
      <div className="text-center space-y-6 px-4">
        <div className="bg-red-100 dark:bg-red-900/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl">⚠️</span>
        </div>

        <h1 className="text-2xl font-semibold">Something went wrong!</h1>

        <p className="text-muted-foreground max-w-lg mx-auto">
          {error.message ||
            "An unexpected error has occurred. We've been notified and are working to fix the issue."}
        </p>

        <div className="flex items-center justify-center gap-4">
          <Button
            variant="outline"
            onClick={reset}
            className="inline-flex items-center"
          >
            <RefreshCcw className="mr-2 h-4 w-4" />
            Try again
          </Button>

          <Button asChild>
            <Link href="/" className="inline-flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>

        {process.env.NODE_ENV === "development" && error.digest && (
          <div className="mt-4 text-sm text-muted-foreground">
            <p>Error digest: {error.digest}</p>
          </div>
        )}
      </div>
    </div>
  );
}
