"use client";
import { avatarPlaceholderUrl, navItems } from '@/constants'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

interface Props {
    fullName : string;
    avatar : string;
    email : string;
}
const Sidebar = ({fullName , avatar , email} : Props) => {

    const pathname = usePathname();
  return (
    <aside className='sidebar'>
        <Link href={"/"}>
            <span className="text-brand font-bold flex justify-center items-center text-3xl">StoreApp</span>
        </Link>

        <nav className='sidebar-nav'>
            <ul className='flex flex-1 flex-col gap-6'>
                {
                    navItems.map(({name,icon,url}) => (
                        <Link key={name} href={url} className='lg:w-full'>
                            <li className={cn("sidebar-nav-item",pathname === url && "shad-active")}>
                                <Image src={icon} alt='icon' width={24} height={24} className={cn("nav-icon",pathname === url && 'nav-icon-active')} />
                                <p className='hidden lg:block'>{name}</p>
                            </li>
                        </Link>
                    ))
                }
            </ul>
        </nav>

        <div className='sidebar-user-info'>
            <Image src={avatar} alt='avatar' width={44} height={44} className='sidebar-user-avatar' />
            <div className='hidden lg:block'>
                <p className='subtitle-2 capitalize'>{fullName}</p>
                <p className='caption'>{email}</p>
            </div>
        </div>
    </aside>
  )
}

export default Sidebar
