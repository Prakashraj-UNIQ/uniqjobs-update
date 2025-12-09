import BlogAsideWrapper from "@/components/blog/BlogAsideWrapper";
import { Suspense } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen  mt-20 md:mt-0">
            <aside className=" overflow-y-auto bg-white z-1000 px-25">
                <Suspense fallback={<div>Loading filters...</div>}>
                    <BlogAsideWrapper />

                </Suspense>
            </aside>
            {children}
        </div>);
}
