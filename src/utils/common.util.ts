export const getMessageError = (errors: any, name: string) => {
  const keys = name.split('.');
  let result = errors;
  for (const key of keys) {
    result = result?.[key];
  }
  const message = result && result.message;
  return message || '';
};

