import BlogAsideWrapper from "@/components/blog/BlogAsideWrapper";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen  mt-20 md:mt-0">
            <aside className=" overflow-y-auto bg-white z-1000 px-25">
                <BlogAsideWrapper />
            </aside>
            {children}
        </div>);
}
