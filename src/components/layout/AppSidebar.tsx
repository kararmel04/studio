'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarMenuSub,
  SidebarMenuSubButton,
} from '@/components/ui/sidebar';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Home, Bot, Code, BookCopy, Search, ChevronDown, Folder, Tag, Book } from 'lucide-react';
import type { Post } from '@/types';
import { ScrollArea } from '../ui/scroll-area';
import { cn } from '@/lib/utils';

interface AppSidebarProps {
  posts: Post[];
}

const Logo = () => (
  <Link href="/" className="flex items-center gap-2.5 font-bold text-lg text-foreground tracking-tighter">
    <BookCopy className="h-7 w-7 text-primary" />
    <span>DevFlow Wiki</span>
  </Link>
);

export function AppSidebar({ posts }: AppSidebarProps) {
  const pathname = usePathname();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [openCategories, setOpenCategories] = React.useState<Record<string, boolean>>({});

  const filteredPosts = React.useMemo(() => {
    if (!searchTerm) return posts;
    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [posts, searchTerm]);

  const groupedPosts = React.useMemo(() => {
    return filteredPosts.reduce((acc, post) => {
      const { category } = post;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(post);
      return acc;
    }, {} as Record<string, Post[]>);
  }, [filteredPosts]);

  React.useEffect(() => {
    const currentCategory = posts.find(p => `/wiki/${p.slug}` === pathname)?.category;
    if (currentCategory) {
      setOpenCategories(prev => ({...prev, [currentCategory]: true}));
    }
  }, [pathname, posts]);

  const toggleCategory = (category: string) => {
    setOpenCategories(prev => ({...prev, [category]: !prev[category]}));
  }

  return (
    <Sidebar collapsible="icon" className="border-r">
      <SidebarHeader>
        <Logo />
      </SidebarHeader>
      <SidebarContent asChild>
        <ScrollArea className="flex-1">
          <div className="px-4 py-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === '/'}>
                <Link href="/">
                  <Home />
                  Dashboard
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname.startsWith('/analyzer')}>
                <Link href="/analyzer">
                  <Bot />
                  Error Analyzer
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname.startsWith('/snippets')}>
                <Link href="/snippets">
                  <Code />
                  Snippets
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
          <div className="px-4 text-xs font-medium text-muted-foreground mt-4 mb-2">KNOWLEDGE BASE</div>
          <SidebarMenu>
            {Object.entries(groupedPosts).map(([category, categoryPosts]) => (
               <Collapsible key={category} open={openCategories[category]} onOpenChange={() => toggleCategory(category)}>
                 <SidebarMenuItem>
                   <CollapsibleTrigger asChild>
                     <Button variant="ghost" className="w-full justify-between pr-2 pl-2 h-8 group">
                       <div className="flex items-center gap-2">
                         <Folder className="h-4 w-4 text-muted-foreground" />
                         <span className="text-sm font-medium">{category}</span>
                       </div>
                       <ChevronDown className={cn("h-4 w-4 transition-transform", openCategories[category] && "rotate-180")} />
                     </Button>
                   </CollapsibleTrigger>
                 </SidebarMenuItem>
                 <CollapsibleContent>
                   <SidebarMenuSub>
                     {categoryPosts.map((post) => (
                       <SidebarMenuItem key={post.slug}>
                         <SidebarMenuSubButton asChild isActive={pathname === `/wiki/${post.slug}`}>
                           <Link href={`/wiki/${post.slug}`}>
                             <Book className="h-3.5 w-3.5" />
                             <span>{post.title}</span>
                           </Link>
                         </SidebarMenuSubButton>
                       </SidebarMenuItem>
                     ))}
                   </SidebarMenuSub>
                 </CollapsibleContent>
               </Collapsible>
            ))}
          </SidebarMenu>
        </ScrollArea>
      </SidebarContent>
      <SidebarFooter>
        <p className="text-xs text-muted-foreground p-4">© 2024 DevFlow Wiki</p>
      </SidebarFooter>
    </Sidebar>
  );
}
