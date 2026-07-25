import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "OUR Agency — Creative Digital Agency",
  description:
    "A young, results-driven creative agency specializing in Branding, Ads, Content, SMM & Video Production across KSA and Egypt.",
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/logo.png", sizes: "any" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;700&family=JetBrains+Mono:wght@300;400&family=Cairo:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `
          body { top: 0 !important; position: static !important; }
          .goog-te-banner-frame.skiptranslate { display: none !important; }
          .skiptranslate { display: none !important; }
          #goog-gt-tt { display: none !important; }
          .goog-te-balloon-frame { display: none !important; }
          .VIpgJd-ZVi9od-aZ2wEe-wOHMyf { display: none !important; }
        `,
          }}
        />
      </head>
      <body
        className="bg-[#0D1117] text-white antialiased"
        suppressHydrationWarning
      >
        {/* Hidden Google Translate mount */}
        <div id="google_translate_element" style={{ display: "none" }} />

        <Navbar />
        <main>{children}</main>
        <Footer />

        {/* ✅ FIX 1: Patch DOM to prevent React + Google Translate removeChild crash */}
        <Script id="gt-dom-fix" strategy="beforeInteractive">
          {`
            (function() {
              if (typeof Node !== 'function' || !Node.prototype) return;

              var originalRemoveChild = Node.prototype.removeChild;
              Node.prototype.removeChild = function(child) {
                if (child.parentNode !== this) {
                  return child;
                }
                return originalRemoveChild.apply(this, arguments);
              };

              var originalInsertBefore = Node.prototype.insertBefore;
              Node.prototype.insertBefore = function(newNode, refNode) {
                if (refNode && refNode.parentNode !== this) {
                  return newNode;
                }
                return originalInsertBefore.apply(this, arguments);
              };
            })();
          `}
        </Script>

        {/* Google Translate init */}
        <Script
          id="google-translate-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              function googleTranslateElementInit() {
                new google.translate.TranslateElement({
                  pageLanguage: 'en',
                  includedLanguages: 'ar',
                  autoDisplay: false,
                  layout: google.translate.TranslateElement.InlineLayout.SIMPLE
                }, 'google_translate_element');
              }
            `,
          }}
        />
        <Script
          id="google-translate-script"
          src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
