export const decodeBase64 = (base64String) => {
  try {
    return atob(base64String);
  } catch (error) {
    console.error("Invalid Base64 string:", error);
    return null;
  }
}
