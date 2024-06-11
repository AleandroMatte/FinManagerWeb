function show_successful_post(toast, title, description) {
    toast({
      title: title,
      description: description,
      status: 'success',
      duration: 9000,
      isClosable: true,
    });
  }
  
  function show_error_post(toast, title, description) {
    toast({
      title: title,
      description: description,
      status: 'error',
      duration: 9000,
      isClosable: true,
    });
  }
  
  function handlePostResponse(toast, success, title, description) {
    if (success) {
      show_successful_post(toast, title, description);
    } else {
      show_error_post(toast, title, description);
    }
  }
  
  export default handlePostResponse;
  