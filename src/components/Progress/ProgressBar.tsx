import * as React from "react"

interface ProgressBarProps {
  progressPercentage: number | string
}

export const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  (props, ref) => {
    const { progressPercentage, ...rest } = props

    return (
      <div
        className="h-2 w-full bg-gray-300 rounded overflow-hidden"
        ref={ref}
        {...rest}
      >
        <div
          style={{ width: `${progressPercentage}%` }}
          className={`h-full ${
            progressPercentage < 70 ? "bg-red-600" : "bg-green-600"
          }`}
        ></div>
      </div>
    )
  },
)
