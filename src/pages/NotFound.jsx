import React from 'react'

const NotFound = () => {
  return (
    <>
      <section className="h-screen w-full flex justify-center items-center bg-[#22232e]">
        <div className="container flex flex-col-reverse lg:flex-row justify-center items-center gap-5">
          <div className="text block px-10 w-[100%] lg:w-[450px]">
            <h1 className="font-My-Font text-[#00c2cb] text-4xl font-bold mb-4">Page Not Found</h1>
            <p className="text-base text-[#e0ffff] mb-4 ">We can't seem to find the page you're looking for. Please check the URL for any typos.</p>
            <ul className="menu list-disc text-[#e0ffff] font-My-Font flex flex-col mt-4 ml-7">
              <li><a className="text-[#00c2cb] text-base flex transition" href="/">Go to Homepage</a></li>
              <li><a className="text-[#00c2cb] text-base flex transition" href="/tasks">Check Tasks</a></li>
            </ul>
          </div>
          <div><img class="image" width="420px" src="https://omjsblog.files.wordpress.com/2023/07/errorimg.png" alt="" /></div>
        </div>
      </section >
    </>
  )
}

export default NotFound