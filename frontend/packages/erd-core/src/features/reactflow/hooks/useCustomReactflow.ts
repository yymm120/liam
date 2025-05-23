import { type FitViewOptions, useReactFlow } from '@xyflow/react'
import { useCallback } from 'react'
import { MAX_ZOOM, MIN_ZOOM } from '../constants'

export const useCustomReactflow = () => {
  const reactFlowInstance = useReactFlow()
  const { fitView: primitiveFitView, ...restFunctions } = reactFlowInstance

  const fitView = useCallback(
    async (options?: FitViewOptions) => {
      primitiveFitView({
        minZoom: MIN_ZOOM,
        maxZoom: MAX_ZOOM,
        ...options,
      })
    },
    [primitiveFitView],
  )

  return {
    ...restFunctions,
    fitView,
  }
}
