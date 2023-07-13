// we can make this a client component by using the client import, but then we cannot make this async
// 'use client'

async function page() {
  // create artificial delay to simulate a slow page
  await new Promise(resolve => setTimeout(resolve, 1000));

  // throwing an error will trigger the error.tsx page
  // throw Error('ERROR')
  
  return (
    <div>Hello, NextJS 13!</div>
  )
}

export default page
