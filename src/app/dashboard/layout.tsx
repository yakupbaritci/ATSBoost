'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
    FileText,
    Home,
    LogOut,
    Settings,
    Plus,
    Sparkles,
    Video,
    Briefcase,
    Library,
    MessageSquare,
    Bell,
    User
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CreateResumeDialog } from '@/components/dashboard/CreateResumeDialog'

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname()
    const router = useRouter()
    const [isLoggingOut, setIsLoggingOut] = useState(false)
    const supabase = createClient()

    const handleLogout = async () => {
        setIsLoggingOut(true)
        await supabase.auth.signOut()
        router.push('/login')
        router.refresh()
    }

    const navItems = [
        { href: '/dashboard/resumes', label: 'My Dashboard', icon: FileText },
        { href: '#', label: 'AI Resume Agent', icon: Sparkles, badge: 'New', highlight: true },
        { href: '#', label: 'AI Interview', icon: Video, badge: 'New', highlight: true },
        { href: '#', label: 'Job Search', icon: Briefcase },
        { href: '#', label: 'Sample Library', icon: Library },
        { href: '#', label: 'Review My Resume', icon: FileText },
    ]

    return (
        <div className="flex h-screen bg-[#f3f4f6] dark:bg-zinc-950 font-sans">
            {/* Sidebar - Rezi Style Dark Theme */}
            <aside className="w-64 bg-[#1a1b41] text-white hidden md:flex flex-col shrink-0 transition-all duration-300">
                {/* Logo Area */}
                <div className="p-6 flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-blue-500 rounded-lg flex items-center justify-center font-bold text-white text-lg shadow-lg">
                        R
                    </div>
                    <span className="font-bold text-xl tracking-wide">ATSBoost</span>
                </div>

                {/* Main Action Button */}
                <div className="px-4 mb-6">
                    <CreateResumeDialog>
                        <Button
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-6 shadow-md transition-all hover:scale-[1.02]"
                        >
                            <Plus className="mr-2 h-5 w-5" />
                            CREATE NEW RESUME
                        </Button>
                    </CreateResumeDialog>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 px-3 space-y-1 overflow-y-auto custom-scrollbar">
                    {navItems.map((item) => {
                        const Icon = item.icon
                        const isActive = pathname === item.href || (item.href !== '#' && pathname.startsWith(item.href))

                        return (
                            <Link
                                key={item.label}
                                href={item.href}
                                className={`group flex items-center justify-between px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200
                                    ${isActive
                                        ? 'bg-white/10 text-white'
                                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <Icon className={`w-5 h-5 ${item.highlight ? 'text-blue-400' : ''}`} />
                                    <span>{item.label}</span>
                                </div>
                                {item.badge && (
                                    <span className="text-[10px] font-bold bg-teal-500 text-white px-1.5 py-0.5 rounded uppercase tracking-wider">
                                        {item.badge}
                                    </span>
                                )}
                            </Link>
                        )
                    })}
                </nav>

                {/* Bottom Actions */}
                <div className="p-4 space-y-2">
                    <Link
                        href="#"
                        className="flex items-center gap-3 px-3 py-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg text-sm"
                    >
                        <MessageSquare className="w-4 h-4" />
                        Talk to other users
                    </Link>

                    {/* User Profile Mini-Card */}
                    <div className="mt-4 pt-4 border-t border-gray-700">
                        <div className="flex items-center gap-3 px-2 mb-3">
                            <Avatar className="w-8 h-8 border border-white/20">
                                <AvatarFallback className="bg-blue-600 text-xs">YB</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-white truncate">My Account</p>
                                <p className="text-xs text-gray-400 truncate">Free Plan</p>
                            </div>
                        </div>
                        <Button
                            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white h-8 text-xs font-bold uppercase tracking-wider"
                        >
                            Upgrade
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="w-full mt-2 text-gray-500 hover:text-red-400 hover:bg-transparent h-6 text-xs"
                            onClick={handleLogout}
                            disabled={isLoggingOut}
                        >
                            {isLoggingOut ? '...' : 'Log out'}
                        </Button>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col h-full overflow-hidden bg-[#f8f9fc] dark:bg-zinc-950">
                {/* Top Header Row (Tabs & Actions) */}
                <header className="h-16 px-8 flex items-center justify-between bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800 shrink-0">

                    {/* Tabs */}
                    <div className="flex items-center gap-1">
                        <Link
                            href="/dashboard/resumes"
                            className={`px-4 py-2 text-sm font-bold rounded-md transition-colors ${pathname.includes('/resumes') ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            RESUMES
                        </Link>
                        <Link
                            href="#"
                            className="px-4 py-2 text-sm font-bold text-gray-400 hover:text-gray-600 rounded-md transition-colors"
                        >
                            COVER LETTERS
                        </Link>
                        <Link
                            href="#"
                            className="px-4 py-2 text-sm font-bold text-gray-400 hover:text-gray-600 rounded-md transition-colors"
                        >
                            RESIGNATION LETTERS
                        </Link>
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center gap-6">
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs px-6 h-9 uppercase tracking-wide shadow-sm">
                            Upgrade
                        </Button>
                        <div className="relative cursor-pointer text-gray-400 hover:text-gray-600">
                            <Bell className="w-5 h-5" />
                            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm cursor-pointer border border-blue-200">
                            Y
                        </div>
                    </div>
                </header>

                {/* Content Workspace */}
                <div className="flex-1 overflow-auto p-8">
                    {children}
                </div>
            </main>
        </div>
    )
}
