import { Chip } from "@nextui-org/react";
import { Icon } from "@iconify/react";

import { type SidebarItem, SidebarItemType } from "./sidebar";

export const sectionNestedItems: SidebarItem[] = [
    {
        key: "home",
        href: "/",
        icon: "solar:home-2-linear",
        title: "Главная",
    },
    {
        key: "panel",
        href: "/panel",
        icon: "solar:checklist-minimalistic-linear",
        title: "Панель",
    },
    {
        key: "labs",
        title: "Лабораторные работы",
        items: [
            {
                key: "lr2_24",
                title: "ЛР 2.24",
                icon: "solar:suitcase-linear",
                type: SidebarItemType.Nest,
                items: [
                    {
                        key: "lr2_24/info_1",
                        icon: "solar:book-bookmark-linear",
                        href: "/panel/lr2_24/info_1",
                        title: "Методические материалы",
                    },
                    {
                        key: "lr2_24/task_1",
                        icon: "solar:clipboard-list-linear",
                        href: "/panel/lr2_24/task_1",
                        title: "Задание 1",
                    },
                    {
                        key: "lr2_24/task_2",
                        icon: "solar:clipboard-list-linear",
                        href: "/panel/lr2_24/task_2",
                        title: "Задание 2",
                    },
                    {
                        key: "lr2_24/task_3",
                        icon: "solar:clipboard-list-linear",
                        href: "/panel/lr2_24/task_3",
                        title: "Задание 3",
                    },
                ],
            },
            {
                key: "lr-2.28",
                title: "ЛР 2.28",
                icon: "solar:suitcase-linear",
                type: SidebarItemType.Nest,
                items: [
                    {
                        key: "shareholders",
                        icon: "solar:users-group-rounded-linear",
                        href: "#",
                        title: "Shareholders",
                    },
                    {
                        key: "note_holders",
                        icon: "solar:notes-outline",
                        href: "#",
                        title: "Note Holders",
                    },
                    {
                        key: "transactions_log",
                        icon: "solar:clipboard-list-linear",
                        href: "#",
                        title: "Transactions Log",
                    },
                ],
            },
        ],
    },
    {
        key: "info",
        title: "Полезные материалы",
        items: [
            {
                key: "home",
                href: "/",
                icon: "solar:square-forward-outline",
                title: "Ссылка 1",
            },
        ],
    },
];
