import type { IconName } from '@front/icons';

export const defaultFileTypes = [
  'video/x-msvideo',
  'text/csv',
  'application/msword',
  'image/gif',
  'image/jpeg',
  'audio/mpeg',
  'video/mp4',
  'video/mpeg',
  'image/png',
  'application/pdf',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'image/svg+xml',
  'image/tiff',
  'text/plain',
  'audio/wav',
  'image/webp',
  'application/vnd.rar',
  'application/zip',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
];

export const additionalImageMimeTypes = [
  'image/bmp',
  'image/apng',
  'image/avif',
  'image/vnd.microsoft.icon',
  'image/x-icon',
  'image/heif',
  'image/heic',
  'image/vnd.wap.wbmp',
  'image/vnd.net-fpx',
];

export const iconMap: Record<string, IconName> = {
  'video/x-msvideo': 'media-and-devices/video-recorder',
  'text/csv': 'files/file-02',
  'application/msword': 'files/file-02',
  'image/gif': 'images/image-01',
  'image/jpeg': 'images/image-01',
  'audio/mpeg': 'media-and-devices/music-note-01',
  'video/mp4': 'media-and-devices/video-recorder',
  'video/mpeg': 'media-and-devices/video-recorder',
  'image/png': 'images/image-01',
  'application/pdf': 'files/file-02',
  'application/vnd.ms-powerpoint': 'charts/presentation-chart-01',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation':
    'charts/presentation-chart-01',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
    'files/file-02',
  'image/svg+xml': 'images/image-01',
  'image/tiff': 'images/image-01',
  'text/plain': 'files/file-01',
  'audio/wav': 'media-and-devices/music-note-01',
  'image/webp': 'images/image-01',
  'application/vnd.rar': 'development/pack',
  'application/zip': 'development/pack',
  'application/vnd.ms-excel': 'files/file-02',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
    'files/file-02',
};
