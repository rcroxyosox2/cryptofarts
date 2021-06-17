import { useState, useEffect } from 'react';

const useRequest = function(props) {
  const [requestResult, setRequestResult] = useState({
    error: null,
    response: null,
    loading: false
  });

  let unmounted = false;

  const makeRequest = function() {
    const _arguments = (arguments.length && [...arguments]) || props.requestData;
    setRequestResult({ loading: true });
    const request = Array.isArray(_arguments) ? props.request(..._arguments) : props.request(_arguments);

    return request
      .then(response => {
        !unmounted && setRequestResult({error: null, response, loading: false});
        return response;
      })
      .catch(error => {
        const errorMessage = error?.message ? error?.message : error;
        !unmounted && setRequestResult({error: errorMessage, response: null, loading: false});
        return error;
      });
  }

  useEffect(() => {
    props.runOnMount && makeRequest();
    return () => {
      unmounted = true;
    }
  }, []);

  return { ...requestResult, makeRequest, ...props };

}

export default useRequest;
