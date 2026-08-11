/**
 * Image compression utility to prevent localStorage QuotaExceededError
 * and optimize image performance across the portfolio app.
 */

export async function compressImage(
  input: File | string,
  maxWidth = 1200,
  quality = 0.7
): Promise<string> {
  return new Promise((resolve) => {
    const processDataUrl = (dataUrl: string) => {
      // If it's already a tiny string or SVG, return as is
      if (dataUrl.length < 50000 || dataUrl.startsWith('data:image/svg+xml')) {
        resolve(dataUrl);
        return;
      }

      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          let { width, height } = img;

          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          if (!ctx) {
            resolve(dataUrl);
            return;
          }

          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, width, height);
          ctx.drawImage(img, 0, 0, width, height);

          // Convert to compressed jpeg
          const compressed = canvas.toDataURL('image/jpeg', quality);
          resolve(compressed);
        } catch (err) {
          console.warn('Image compression fallback:', err);
          resolve(dataUrl);
        }
      };

      img.onerror = () => {
        resolve(dataUrl);
      };

      img.src = dataUrl;
    };

    if (input instanceof File) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          processDataUrl(e.target.result as string);
        } else {
          resolve('');
        }
      };
      reader.onerror = () => resolve('');
      reader.readAsDataURL(input);
    } else {
      processDataUrl(input);
    }
  });
}

export async function compressMultipleImages(
  filesOrUrls: (File | string)[],
  maxWidth = 1200,
  quality = 0.7
): Promise<string[]> {
  const promises = filesOrUrls.map(f => compressImage(f, maxWidth, quality));
  return Promise.all(promises);
}
