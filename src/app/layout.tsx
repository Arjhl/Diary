import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Providers } from "./Providers";
import { currentUser } from "@clerk/nextjs";
const inter = Inter({ subsets: ["latin"] });

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "CipherJournal",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  async function getUserData() {
    const user = await currentUser();
    if (!user?.id) return;
    const email = user?.emailAddresses[0].emailAddress.toString();
    const id = user?.emailAddresses[0].id;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/user`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          id,
        }),
      }
    );
    const data = await response.json();
    console.log(data);

    return {
      id: data.id,
      email: data.email,
      username: data.username,
    };
  }

  const data = getUserData();

  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className} id="body">
          <Providers data={data}>{children}</Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
