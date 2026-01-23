import { generateBanner } from '@/shared/lib/utils';
import { AdvancedImage } from '@cloudinary/react';

interface ClassBannerProps {
  bannerUrl?: string | null;
  bannerCldPubId?: string | null;
  className: string;
  alt?: string;
}

const isCloudinaryHost = (url: string | undefined): boolean => {
  if (!url) {
    return false;
  }

  try {
    const parsed = new URL(url);
    return parsed.hostname === 'res.cloudinary.com';
  } catch {
    return false;
  }
};

export const ClassBanner = ({ bannerUrl, bannerCldPubId, className, alt = 'Class Banner' }: ClassBannerProps) => {
  if (!bannerUrl) {
    return (
      <div
        className="placeholder"
        aria-label="No banner image available"
      />
    );
  }

  const isCloudinaryUrl = isCloudinaryHost(bannerUrl) && Boolean(bannerCldPubId);

  if (isCloudinaryUrl && bannerCldPubId) {
    return (
      <AdvancedImage
        cldImg={generateBanner(bannerCldPubId, className)}
        alt={alt}
      />
    );
  }

  return (
    <img
      src={bannerUrl}
      alt={alt}
      loading="lazy"
      className="h-full w-full object-cover"
    />
  );
};
