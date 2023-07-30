const getCallbackUrl = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const directUrl = urlParams.get("callbackUrl");
  return directUrl ? directUrl : "/";
};

export default getCallbackUrl;
