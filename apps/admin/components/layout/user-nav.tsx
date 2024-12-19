'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  BadgeCheck,
  CircleUser,
  CreditCard,
  LogOut,
  Settings
} from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
export function UserNav() {
  const { data: session } = useSession();
  if (session) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="relative h-8 w-8 rounded-full focus-visible:ring-0"
          >
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarImage
                src={session?.user?.image ?? ''}
                alt={session?.user?.name ?? 'User avatar'}
              />
              <AvatarFallback className="rounded-lg">
                {session?.user?.name ? session?.user?.name.slice(0, 1) : 'N/A'}
              </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">
                {session?.user?.name}
              </span>
              <span className="truncate text-xs">{session?.user?.email}</span>
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="p-0 font-normal">
            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage
                  src={session?.user?.image ?? ''}
                  alt="User avatar"
                />
                <AvatarFallback className="rounded-lg">
                  <CircleUser className="h-full w-full" strokeWidth={1} />
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {session?.user?.name}
                </span>
                <span className="truncate text-xs">{session?.user?.email}</span>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <Link href="/profile">
              <DropdownMenuItem>
                <BadgeCheck className="mr-2 size-4" />
                Profile
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem>
              <CreditCard className="mr-2 size-4" />
              Billing
              <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 size-4" />
              Settings
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              signOut({
                callbackUrl: `/auth/signin?callbackUrl=${encodeURIComponent(
                  window.location.pathname
                )}`
              });
            }}
          >
            <LogOut className="mr-2 size-4" />
            Log out
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
}
