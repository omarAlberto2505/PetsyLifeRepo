import { ServerError } from "@/types/errors"
import { toast } from "@heroui/react"
import { HardDrive } from "lucide-react"
import { startTransition, useActionState, useEffect } from "react"

export type CustomActionsResponseStandard<T> = { response: T | null, error?: ServerError}

type UseActionStateCustomProps<T> = {
    callback: () => Promise<CustomActionsResponseStandard<T>>,
    initialState?: Awaited<CustomActionsResponseStandard<T>>,
    /**
     * Values that should re-run the action when they change. Omit it and the
     * action runs once on mount. Keep the list a fixed length — React warns when
     * a dependency array changes size between renders.
     */
    deps?: unknown[],
}

export const useActionStateCustom = <T,>(props: UseActionStateCustomProps<T>) =>{

    const { deps = [] } = props

    const [state, dispatch, isPending ] = useActionState(
        async () => await props.callback(),
        props.initialState,
    )

    useEffect(() => {
        // `props.callback` is intentionally not a dependency: it is a new closure
        // on every render, so depending on it would loop. useActionState mutates
        // its stored action each render, so `dispatch` already runs the newest
        // closure — the one holding the current `deps` values.
        startTransition(() => {
            dispatch()
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, ...deps])


    useEffect(() => {
        if(!isPending){
            if(state?.error){
                toast.danger(state.error.title, {
                    actionProps: {
                        children: "Close",
                        onPress: () => {},
                        variant: "danger",
                    },
                    description: state.error.detail,
                    indicator: <HardDrive />,
                })
            }
        }
    }, [state, isPending])

    return { 
        response: state?.response,
        isPending,
        hasError: state?.error instanceof ServerError
    }
}
