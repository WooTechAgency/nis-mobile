import ErrorModal from '@components/modal/error-modal';

export const showErrorMessage = ({title, message, btnText}:{title?: string, message: string, btnText?:string}) => {
  ErrorModal.show({title, message, btnText})
};


export const formatBytes = (bytes?: number | null, decimals = 2) => {
  if (!bytes || bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + ' ' + sizes[i];
}