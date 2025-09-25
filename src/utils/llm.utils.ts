import { Alert } from 'react-native';
import RNFS from 'react-native-fs';

export const convertByteToMb = (size?: number | null) => {
  if (!size) {
    return 0;
  }
  return Number(size / (1024 * 1024));
};

export const downloadModel = async (
  modelName: string,
  modelUrl: string,
  onProgress: (progress: number) => void,
  onGetFileSize: (fileSize: number) => void
): Promise<string> => {
  const destPath = `${RNFS.DocumentDirectoryPath}/${modelName}`;
  try {
    // Check if the destination path is valid
    if (!modelName || !modelUrl) {
      throw new Error('Invalid model name or URL');
    }
    const fileExists = await RNFS.exists(destPath);

    // If it exists, delete it
    if (fileExists) {
      await RNFS.unlink(destPath);
      console.log(`Deleted existing file at ${destPath}`);
    }

    console.log('Starting download from:', modelUrl);

    const downloadResult = await RNFS.downloadFile({
      fromUrl: modelUrl,
      toFile: destPath,
      progressDivider: 1,
      discretionary: true,
      background: true,
      begin: (res) => {
        onGetFileSize(convertByteToMb(res.contentLength));
      },
      resumable: async () => {
        try {
          const stat = await RNFS.stat(destPath);
          const downloaded = Number(stat.size);
          console.log('resumable ', downloaded);
          onProgress(Math.floor(downloaded));
          Alert.alert('resume called');
        } catch (e) {
          console.log('Error checking file size on resumable:', e);
        }
      },
      progress: ({ bytesWritten, contentLength }: { bytesWritten: number; contentLength: number }) => {
        const progress = (bytesWritten / contentLength) * 100;
        console.log('Download progress:', progress);
        onProgress(Math.floor(progress));
      },
    }).promise;
    const stat = await RNFS.stat(destPath);
    console.log('File size in MB:', (stat.size / (1024 * 1024)).toFixed(2));
    if (downloadResult.statusCode === 200) {
      return destPath;
    } else {
      throw new Error(`Download failed with status code: ${downloadResult.statusCode}`);
    }
  } catch (error) {
    throw new Error(`Failed to download model: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};
