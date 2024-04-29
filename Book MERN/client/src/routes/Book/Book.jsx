import React, { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'


const Book = () => {
  const [data, setData] = useState([])
const [isLoading,setIsLoading] = useState(true)
const [error,setError]= useState(null)
const [selectedCategory,setSelectedCtegory] =useState('')

const baseUrl ='http://localhost:8000/api/books'


const fetchBook = async ()=>{
  try {

let url = baseUrl;

    if(selectedCategory){
      url += `?category=${selectedCategory}`
    }

    const response = await fetch(url)
    const jsonData = await response.json()
    setData(jsonData)
    setIsLoading(false)

  } catch (error) {
  setError(`Error fetching data.Please try again later.`)
setIsLoading(false)

  }
}

useEffect(()=>{
fetchBook()
},[selectedCategory])


  return (
    <div>


<h1>Books</h1>
        <p>Miniature vite + react demo website</p>
        <p>It uses Nodejs,express & mongoDB as backend</p>
    
<Link to='/createbook'>Add New Book</Link>
<h2>Fetch example</h2>

<div className='filters'>
<label>Categories</label>

<select onChange={((e)=>setSelectedCtegory(e.target.value))}>
<option value=''>All</option>
<option value=''>romance</option>

</select>
</div>

{isLoading?(
  <p>Loading...</p>
):error?(
<p>{error}</p>):(
  <ul className='books'>
  {data.map((book)=>{
    <li key={book._id}>
      <Link to={`1/books/$:{item.slug}`}>
        <img src={`http://localhost:8000/uploads/${book.thumbnail}`} alt='item.title' />
     <h3>{book.title}</h3>
      </Link>
    </li>

  })}
</ul>
)}





    </div> 
     )
}

export default Book


