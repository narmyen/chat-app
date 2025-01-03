'use client'
import React from 'react'

import { ClerkProvider, RedirectToSignIn, SignedIn, SignedOut, SignInButton, useAuth, UserButton } from "@clerk/clerk-react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { Authenticated, AuthLoading, ConvexReactClient } from "convex/react";
import LoadingLogo from '@/components/ui/shared/LoadingLogo';

interface Props {
  children: React.ReactNode;
}

const CONVEX_URL = process.env.NEXT_PUBLIC_CONVEX_URL || '';
const NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || '';

const convex = new ConvexReactClient(CONVEX_URL)


function ConvexClientProvider({ children }: Props) {
  return (
    <ClerkProvider publishableKey={NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
        <AuthLoading>
          <LoadingLogo />
        </AuthLoading>
        <SignedIn>
          {children}
        </SignedIn>
        <SignedOut>
          <RedirectToSignIn />
        </SignedOut>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  )
}

export default ConvexClientProvider
