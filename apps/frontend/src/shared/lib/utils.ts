import { BANNER_DIMENSIONS, BANNER_TEXT_CONFIG } from '@/shared/constants';
import { cloudinary } from '@/shared/lib/cloudinary';
import { dpr, format, quality } from '@cloudinary/url-gen/actions/delivery';
import { source } from '@cloudinary/url-gen/actions/overlay';
import { fill } from '@cloudinary/url-gen/actions/resize';
import { CloudinaryImage } from '@cloudinary/url-gen/index';
import { Position } from '@cloudinary/url-gen/qualifiers';
import { compass } from '@cloudinary/url-gen/qualifiers/gravity';
import { text } from '@cloudinary/url-gen/qualifiers/source';
import { TextStyle } from '@cloudinary/url-gen/qualifiers/textStyle';
import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getInitials = (name = ''): string => {
  const parts = name.trim().split(/\s+/).filter(Boolean);

  if (parts.length === 0) return '';
  if (parts.length === 1) return parts[0][0]?.toUpperCase() ?? '';

  const firstInitial = parts[0][0] ?? '';
  const lastInitial = parts[parts.length - 1][0] ?? '';

  return `${firstInitial}${lastInitial}`.toUpperCase();
};

export const truncate = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
};

function optimizeImage(image: CloudinaryImage): CloudinaryImage {
  return image.delivery(format('auto')).delivery(quality('auto')).delivery(dpr('auto'));
}

export function generateBanner(publicId: string, overlayText: string): CloudinaryImage {
  const image = cloudinary
    .image(publicId)
    .resize(fill().width(BANNER_DIMENSIONS.width).height(BANNER_DIMENSIONS.height));

  const optimizedImage = optimizeImage(image);

  const textStyle = new TextStyle(BANNER_TEXT_CONFIG.fontFamily, BANNER_TEXT_CONFIG.fontSize).fontWeight(
    BANNER_TEXT_CONFIG.fontWeight
  );

  const position = new Position()
    .gravity(compass(BANNER_TEXT_CONFIG.position.gravity))
    .offsetY(BANNER_TEXT_CONFIG.position.offsetY)
    .offsetX(BANNER_TEXT_CONFIG.position.offsetX);

  const textOverlay = source(text(overlayText, textStyle).textColor(BANNER_TEXT_CONFIG.color)).position(position);

  return optimizedImage.overlay(textOverlay);
}
