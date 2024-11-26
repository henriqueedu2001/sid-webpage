export default async function Page({ params }) {
  const { article_id } = await params;
  fetchData(article_id);
  return <p> id: {article_id}</p>;
}

async function fetchData(article_id) {
  let url = `https://sid-api-yrbb.onrender.com/articles/${article_id}`;
  console.log(url)
  let res = await fetch(url)
  let apiData = await res.json()
  console.log(apiData);
  // await setData(apiData)
  return null;
}