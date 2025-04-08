import { MountainSnow } from "lucide-react";

import { SignupForm } from "@/components/signup-form";
import Link from "next/link";
import Image from "next/image";
import RedirectIfAuth from "@/components/redirect-if-auth";

export default function SignupPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <RedirectIfAuth />
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <MountainSnow className="size-4" />
            </div>
            PeakFocus
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <SignupForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <Image src="/hero-image.jpg" alt="Mountain" className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale" layout="fill" />
      </div>
    </div>
  );
}
