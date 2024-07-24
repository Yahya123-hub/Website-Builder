'use client'
import MediaComponent from './media-main'
import React, { useEffect, useState } from 'react'

// Placeholder type for GetMediaFiles
type GetMediaFiles = any

// Placeholder function for getMedia
const getMedia = async (): Promise<GetMediaFiles> => {
  // Placeholder implementation
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ files: [] }) // Replace with actual data structure
    }, 1000)
  })
}

const MediaBucketTab = () => {
  const [data, setdata] = useState<GetMediaFiles>(null)

  useEffect(() => {
    const fetchData = async () => {
      const response = await getMedia()
      setdata(response)
    }
    fetchData()
  }, [])

  return (
    <div className="h-[900px] overflow-scroll p-4">
      <MediaComponent data={data} />
    </div>
  )
}

export default MediaBucketTab
