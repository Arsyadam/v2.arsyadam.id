import TransitMapBackground from "./home/transit/TransitMapBackground";
import CtaSection from "./home/CtaSection";

type PageShellProps = {
  children: React.ReactNode;
  withCta?: boolean;
};

export default function PageShell({ children, withCta = true }: PageShellProps) {
  return (
    <div className="relative isolate w-full flex-1 min-h-screen">
      <TransitMapBackground />
      <main className="relative z-10 flex w-full flex-col pt-15 md:pt-20">
        {children}
        {withCta && <CtaSection />}
      </main>
    </div>
  );
}
