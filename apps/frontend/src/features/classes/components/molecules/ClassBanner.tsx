import { generateBanner } from '@/shared/lib/utils';
import { AdvancedImage } from '@cloudinary/react';

interface ClassBannerProps {
  bannerUrl?: string | null;
  bannerCldPubId?: string | null;
  className: string;
  alt?: string;
}

export const ClassBanner = ({ bannerUrl, bannerCldPubId, className, alt = 'Class Banner' }: ClassBannerProps) => {
  if (!bannerUrl) {
    return (
      <div
        className="placeholder"
        aria-label="No banner image available"
      />
    );
  }

  const isCloudinaryUrl = bannerUrl.includes('res.cloudinary.com') && bannerCldPubId;

  if (isCloudinaryUrl) {
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
