import { useEffect, useState } from 'react';
import { use } from 'react';

export default async function Page({ params }) {
  const [data, setData] = useState([])
  const [articleID, setarticleID] = useState('')
  // const { article_id } = await params;
  
  const { article_id } = await params;
  console.log(article_id)
  
  return <p> id</p>;
}

async function fetchData(article_id) {
  let url = `https://sid-api-yrbb.onrender.com/articles/${article_id}`;
  let res = await fetch(url)
  console.log(res.json())
  // let apiData = await res.json()
  // console.log(apiData);
  // await setData(apiData)
  return null;
}