import Image from "next/image";
import Link from "next/link";

export type AchievementItem = {
  organization: string;
  title: string;
  subtitle: string;
  certificateLink: string;
  certificateImage?: string | null;
  gradient: string;
};

export function driveCertificateThumbnail(url: string): string | null {
  const match = url.match(/\/d\/([^/]+)/);
  if (!match?.[1]) return null;
  return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w1000`;
}

export default function AchievementCard({ achievement }: { achievement: AchievementItem }) {
  const hasCertificate = achievement.certificateLink !== "#";
  const imageSrc = achievement.certificateImage;

  const imageBlock = imageSrc ? (
    <div className="relative mb-3 aspect-[4/3] w-full overflow-hidden rounded-lg border border-black/5 bg-neutral-100">
      <Image
        src={imageSrc}
        alt={`Certificate: ${achievement.title}`}
        fill
        className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        unoptimized
      />
    </div>
  ) : (
    <div className="mb-3 flex aspect-[4/3] w-full items-center justify-center rounded-lg border border-dashed border-neutral-200 bg-transparent">
      <span className="px-4 text-center text-[12px] font-medium text-neutral-400">
        Certificate preview
      </span>
    </div>
  );

  return (
    <div
      className={`group flex flex-col rounded-xl border border-black/5 bg-transparent bg-gradient-to-b ${achievement.gradient} p-5 transition-shadow hover:shadow-md`}
      style={{
        boxShadow:
          "0px 4px 6px -2px rgba(0,0,0,0.05), 0px 10px 15px -3px rgba(0,0,0,0.08)",
      }}
    >
      {imageBlock}

      <span className="text-[12px] font-medium text-neutral-400">
        {achievement.organization}
      </span>
      <h3 className="text-[18px] font-medium leading-[120%] tracking-[-0.005em] text-neutral-800 md:text-[20px]">
        {achievement.title}
      </h3>
      <p className="flex-1 text-[13px] leading-[150%] text-neutral-500">
        {achievement.subtitle}
      </p>
      {hasCertificate && (
        <Link
          href={achievement.certificateLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[14px] font-medium text-amber-600 underline transition-colors hover:text-amber-700"
        >
          View full certificate
        </Link>
      )}
    </div>
  );
}
