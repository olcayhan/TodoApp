const fetcher = async (url) => {
  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` }; // Replace with your desired headers
  const response = await fetch(url, { headers });
  const data = await response.json();
  return data;
};
export default fetcher;
