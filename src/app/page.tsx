import Image from "next/image";
import { Bohnen } from "@/components/bohnen/Bohnen";
import { BohnenProvider } from "@/app/BohnenProvider";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="App m-2">
          <BohnenProvider>
            <h1 className="text-3xl text-gray-700 font-bold mb-5">
              The Bean Box
            </h1>
            <Bohnen />
          </BohnenProvider>
        </div>
      </main>
      <footer>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org
        </a>
      </footer>
    </div>
  );
}
