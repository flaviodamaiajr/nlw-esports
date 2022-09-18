interface GameBannerProps {
  title: string;
  bannerUrl: string;
  adsCount: number;
}

export function GameBanner({ title, adsCount, bannerUrl }: GameBannerProps) {
  return (
    <a href="#" className="relative rounded-lg overflow-hidden">
      <img src={bannerUrl} alt={title} />
      <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0">
        <strong className="font-bold text-white block">{title}</strong>
        <span className="text-zinc-500 text-sm block">
          {adsCount} anúnci{adsCount > 1 ? "os" : "o"}
        </span>
      </div>
    </a>
  );
}