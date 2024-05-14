"use client";

import React from "react";
import { Button, Spacer, useDisclosure } from "@nextui-org/react";
import { Icon } from "@iconify/react";

import { sectionNestedItems } from "../../components/sidebar/sidebar-items";

import Sidebar from "../../components/sidebar/sidebar";

import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import SidebarDrawer from "@/components/sidebar/sidebar-drawer";

export default function PanelLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const currentPaths = pathname.split("/");
    console.log("currentPaths", currentPaths);
    let currentPath = "";
    if (currentPaths.length === 2) {
        currentPath = currentPaths[1];
    } else {
        currentPath = currentPaths[2];
    }

    console.log("currentPath", currentPath);

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const content = (
        <div className="relative flex h-full w-72 flex-1 flex-col p-6">
            <div className="flex items-center gap-2 px-2 justify-between">
                <span className="text-small font-bold uppercase text-foreground">
                    {siteConfig.name}
                </span>
                <ThemeSwitch />
            </div>
            <Spacer y={8} />

            <Sidebar
                defaultSelectedKey="panel"
                items={sectionNestedItems}
                selectedKeys={[currentPath]}
            />

            <Spacer y={8} />
            <div className="mt-auto flex flex-col">
                <Button
                    fullWidth
                    className="justify-start text-default-500 data-[hover=true]:text-foreground"
                    startContent={
                        <Icon
                            className="text-default-500"
                            icon="solar:info-circle-line-duotone"
                            width={24}
                        />
                    }
                    variant="light"
                >
                    Помощь & Информация
                </Button>
            </div>
        </div>
    );

    return (
        <div className="flex h-dvh w-full">
            <SidebarDrawer
                className=" !border-r-small border-divider"
                isOpen={isOpen}
                onOpenChange={onOpenChange}
            >
                {content}
            </SidebarDrawer>
            <div className="w-full flex-1 flex-col p-4">
                <header className="flex h-16 items-center gap-2 rounded-medium border-small border-divider px-4 sm:hidden">
                    <Button
                        isIconOnly
                        className="flex sm:hidden"
                        size="sm"
                        variant="light"
                        onPress={onOpen}
                    >
                        <Icon
                            className="text-default-500"
                            height={24}
                            icon="solar:hamburger-menu-outline"
                            width={24}
                        />
                    </Button>
                    <h2 className="text-medium font-medium text-default-700">
                        {siteConfig.name}
                    </h2>
                </header>
                <main className="mt-4 h-full w-full overflow-visible">
                    {children}
                </main>
            </div>
        </div>
    );
}
