
interface ErrorProps {
  data: any;
  error: string;
  global?: boolean;
}

function useHandleError() {
  // const intl = useIntl();
  const handleError = (data: ErrorProps) => {
    if (data.global && data.error) {
      // message.error(intl.formatMessage({ id: data.error }));
    }  
    // smoothScroll('top', 0);
  };

  return [handleError];
}

export default useHandleError;
