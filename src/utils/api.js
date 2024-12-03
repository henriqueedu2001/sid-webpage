const apiBaseUrl =
  process.env.ENV === 'production'
    ? process.env.NEXT_PUBLIC_API_URL_PRODUCTION
    : process.env.NEXT_PUBLIC_API_URL_DEVELOPMENT;

console.log(`Current API Base URL: ${apiBaseUrl}`);

export default apiBaseUrl;