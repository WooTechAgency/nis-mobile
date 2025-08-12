import ErrorModal from '@components/modal/ErrorModal';

export const showErrorMessage = ({title, message, btnText}:{title?: string, message: string, btnText?:string}) => {
  ErrorModal.show({title, message, btnText})
};

