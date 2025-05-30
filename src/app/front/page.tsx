
"use client"
/**
* This code was generated by v0 by Vercel.
* @see https://v0.dev/t/pECY5TwqeAg
* Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
*/

/** Add fonts into your Next.js project:

import { Chivo } from 'next/font/google'
import { IBM_Plex_Sans } from 'next/font/google'

chivo({
  subsets: ['latin'],
  display: 'swap',
})

ibm_plex_sans({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/
import Link from "next/link"
import { useRouter } from "next/navigation";


export default function front() {
  const router = useRouter();

  return (
    (<div
      className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md space-y-6 text-center">
        <h1
          className="text-3xl font-bold tracking-tighter text-foreground sm:text-4xl">Welcome to Event Manager</h1>
        <p className="text-muted-foreground">Organise or Participate Events </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Link
            href="/ngols"
            className="inline-flex h-10 w-full items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 sm:w-auto"
            prefetch={false}>
            Organiser Login/Signup
          </Link>
          <Link
            href="/companyls"
            className="inline-flex h-10 w-full items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 sm:w-auto"
            prefetch={false}>
            User Login/Signup
          </Link>
        </div>
      </div>
    </div>)
  );
}
