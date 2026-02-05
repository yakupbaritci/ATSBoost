import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { CreditCard, User, Mail, Shield } from 'lucide-react'

export default async function SettingsPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Settings</h3>
                <p className="text-sm text-muted-foreground">
                    Manage your account settings and preferences.
                </p>
            </div>
            <Separator />

            <div className="grid gap-6">
                {/* Profile Card */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <User className="w-5 h-5" /> Profile Information
                        </CardTitle>
                        <CardDescription>
                            Your personal account details.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <div className="flex relative">
                                <Mail className="w-4 h-4 absolute left-3 top-3 text-gray-500" />
                                <Input id="email" value={user.email} disabled className="pl-9 bg-muted" />
                            </div>
                            <p className="text-xs text-muted-foreground">Email address cannot be changed.</p>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input id="name" defaultValue={user.user_metadata?.full_name || ''} disabled className="bg-muted" />
                            <p className="text-xs text-muted-foreground">Managed via your auth provider.</p>
                        </div>
                    </CardContent>
                </Card>

                {/* Subscription Card */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <CreditCard className="w-5 h-5" /> Subscription
                        </CardTitle>
                        <CardDescription>
                            Manage your plan and usage limits.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <div className="flex items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                                <label className="text-base font-medium">Free Plan</label>
                                <p className="text-sm text-muted-foreground">
                                    You are currently on the free tier.
                                </p>
                            </div>
                            <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80">
                                Active
                            </span>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                                <span>AI Credits</span>
                                <span className="font-medium">5 remaining</span>
                            </div>
                            {/* Simple Progress Bar */}
                            <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                                <div className="h-full bg-primary w-1/2" />
                            </div>
                            <p className="text-xs text-muted-foreground">Resets monthly.</p>
                        </div>
                    </CardContent>
                    <CardFooter className="border-t px-6 py-4">
                        <Button variant="outline" disabled>Upgrade Plan (Coming Soon)</Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}
