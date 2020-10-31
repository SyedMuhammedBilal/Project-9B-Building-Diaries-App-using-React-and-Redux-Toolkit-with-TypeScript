import React from 'react'

function Text() {
  return (
    <div>
      <section className="text-gray-700 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -mx-4 -my-8">
          <div className="py-8 px-4 lg:w-1/3">
            <div className="h-full flex items-start">
              <div className="flex-grow pl-6">
                <h2 className="tracking-widest text-xs title-font font-medium text-indigo-500 mb-1">Diary App</h2>
                <h1 className="title-font text-xl font-medium text-gray-900 mb-3">React & Redux-Toolkit</h1>
                <p className="leading-relaxed mb-5">The application will allow authenticated users to create or modify existing diaries.</p>
                <a href="!" className="inline-flex items-center">
                </a>
              </div>
            </div>
          </div>
          <div className="py-8 px-4 lg:w-1/3">
            <div className="h-full flex items-start">
              <div className="flex-grow pl-6">
                <h2 className="tracking-widest text-xs title-font font-medium text-indigo-500 mb-1">Diary App</h2>
                <h1 className="title-font text-xl font-medium text-gray-900 mb-3">Formik and YUP</h1>
                <p className="leading-relaxed mb-5">Diaries are private by default, but they can be made public. Finally, diary entries will be sorted by their last modified date.</p>
                <a href="!" className="inline-flex items-center">
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      </section>
    </div>
  )
}

export default Text
