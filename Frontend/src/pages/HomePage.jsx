import React from 'react'
import toast from 'react-hot-toast'
import axiosInstance from '../lib/axios'

function HomePage() {

  return (
    <div>
      <h1
        className='btn btn-secondary'
        onClick={() => toast.success("You Clicked Me")}
      >
        This
      </h1>

      <h1
        className='btn btn-secondary'
        onClick={() =>
          toast.success(axiosInstance.defaults.baseURL)
        }
      >
        Show Base URL
      </h1>
    </div>
  )
}

export default HomePage
