
import { Button } from '@/components/ui/button'
import { Plus, Trash2, Eye, EyeOff, MoreVertical } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from '@/components/ui/badge'

interface SidebarListProps {
    title: string
    items: any[]
    selectedIndex: number
    onSelect: (index: number) => void
    onDelete: (index: number) => void
    onAdd: () => void
    onToggleVisible?: (index: number) => void
    titleKey?: string
    subtitleKey?: string
    getItemTitle?: (item: any) => string
    getItemSubtitle?: (item: any) => string
}

export function SidebarList({
    title,
    items,
    selectedIndex,
    onSelect,
    onDelete,
    onAdd,
    onToggleVisible,
    titleKey = 'title',
    subtitleKey,
    getItemTitle,
    getItemSubtitle
}: SidebarListProps) {
    return (
        <div className="w-80 shrink-0 flex flex-col gap-4 overflow-y-auto pr-2 pb-20 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <div className="flex items-center justify-between px-1">
                <h3 className="font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                    {title}
                </h3>
                <Button size="icon" variant="ghost" className="h-6 w-6 bg-blue-600 text-white hover:bg-blue-700 rounded-full" onClick={onAdd}>
                    <Plus className="w-4 h-4" />
                </Button>
            </div>

            <div className="space-y-2">
                {items?.map((item, index) => {
                    const itemTitle = getItemTitle ? getItemTitle(item) : (item[titleKey] || "Untitled");
                    const itemSubtitle = getItemSubtitle ? getItemSubtitle(item) : (subtitleKey ? item[subtitleKey] : "");
                    const isVisible = item.visible !== false; // Default to true if undefined

                    return (
                        <div
                            key={index}
                            onClick={() => onSelect(index)}
                            className={cn(
                                "group relative p-3 rounded-lg cursor-pointer border transition-all hover:shadow-md",
                                selectedIndex === index
                                    ? "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 ring-1 ring-blue-100 dark:ring-blue-900"
                                    : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300",
                                !isVisible && "opacity-60 grayscale bg-zinc-50 border-dashed"
                            )}
                        >
                            <div className="flex justify-between items-start">
                                <div className="flex-1 min-w-0">
                                    <h4 className={cn("font-bold text-sm truncate", selectedIndex === index ? "text-blue-700 dark:text-blue-300" : "text-zinc-800 dark:text-zinc-200")}>
                                        {itemTitle}
                                    </h4>
                                    {itemSubtitle && (
                                        <p className="text-xs text-zinc-500 truncate mt-0.5">
                                            {itemSubtitle}
                                        </p>
                                    )}
                                </div>

                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-6 w-6 text-zinc-400 opacity-0 group-hover:opacity-100 focus:opacity-100 -mr-1"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <MoreVertical className="w-3 h-3" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        {onToggleVisible && (
                                            <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onToggleVisible(index); }}>
                                                {isVisible ? <EyeOff className="w-3 h-3 mr-2" /> : <Eye className="w-3 h-3 mr-2" />}
                                                {isVisible ? 'Hide from resume' : 'Show on resume'}
                                            </DropdownMenuItem>
                                        )}
                                        <DropdownMenuItem className="text-red-600 focus:text-red-600" onClick={(e) => { e.stopPropagation(); onDelete(index); }}>
                                            <Trash2 className="w-3 h-3 mr-2" /> Delete
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                            {!isVisible && (
                                <Badge variant="outline" className="mt-2 text-[10px] h-4 px-1 text-zinc-400 border-zinc-300">Hidden</Badge>
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
