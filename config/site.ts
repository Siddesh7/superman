export type SiteConfig = typeof siteConfig

export const siteConfig = {
    name: "SuperMan AI",
    description:
        "Beautifully designed components built with Radix UI and Tailwind CSS.",
    mainNav: [
        {
            title: "Home",
            href: "/",
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