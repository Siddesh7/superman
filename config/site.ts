export type SiteConfig = typeof siteConfig

export const siteConfig = {
    name: "SuperMan",
    description:
        "",
    mainNav: [
        {
            title: "Home",
            href: "/",
        },
        {
            title: "Groups",
            href: "/groups"
        },
        {
            title: "Profile",
            href: "/profile"
        }
    ],
    links: {
        twitter: "https://twitter.com/shadcn",
        github: "https://github.com/shadcn/ui",
        docs: "https://ui.shadcn.com",
    },
}