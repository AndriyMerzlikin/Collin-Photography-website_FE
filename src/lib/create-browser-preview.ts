import imageCompression from 'browser-image-compression';

export async function createBrowserPreview(file: File) {
  return await imageCompression(file, {
    maxSizeMB: 1.5,
    maxWidthOrHeight: 1800,
    useWebWorker: true,
  });
}
