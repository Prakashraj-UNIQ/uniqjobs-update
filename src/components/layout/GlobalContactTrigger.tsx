"use client";
import { useEffect, useState } from "react";
import ContactForm from "./ContactForm";

export default function GlobalContactTrigger() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setVisible(entry.intersectionRatio === 0);
      },
      { root: null, threshold: [0, 0.1] }
    );

    io.observe(hero);
    return () => io.disconnect();
  }, []);

  return (
    <>
      {visible && (
        <div className="fixed right-6 bottom-6 z-50">
          <div className="p-2 bg-white rounded-lg shadow-lg">
            <ContactForm onClose={() => setVisible(false)} />
          </div>
        </div>
      )}
    </>
  );
}
