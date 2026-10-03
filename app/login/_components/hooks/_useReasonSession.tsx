"use client"
import { toast } from "@heroui/react"
import { LogInIcon } from "lucide-react"
import {  useRouter, useSearchParams } from "next/navigation"

import { useEffect } from "react"


const SESSION_EXPIRED = "session_expired"

const useReasonSession = () => {
	const params = useSearchParams()
	const router = useRouter();

	useEffect(() => {
		const reason = params.get("reason")
		if (reason) {
			switch (reason) {
				case SESSION_EXPIRED: { 
					const eventId = toast.danger("Session Expired", {
						actionProps: {
							children: "Close",
							variant: "danger",
							onPress: () => toast.close(eventId),
						},
						timeout: 5000, 
						description: "Due to a long period of inactivity the session expired; Please log in",
						indicator: <LogInIcon />,
					})
				
					router.replace('/login', {});
					break
				}
				default:
					break;
			}
		}
	}, [params, router])
}

export default useReasonSession
