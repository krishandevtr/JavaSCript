import React from 'react'

const LoadingSpinner = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
          <div className="w-20 h-20 border-2 border-emerald-200 animate-spin" />
          <div className="absolute left-0 top-0 sr-only">Loading</div>
        </div>
      );
}

export default LoadingSpinner
