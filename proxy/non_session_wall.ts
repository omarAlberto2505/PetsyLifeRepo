import type { Session } from "next-auth"
import { NextRequest, NextResponse } from "next/server"


const NonProtectedRoutes = ["/login", "/error", "/signup"]


export function routes_not_behind_session_wall(
	request: NextRequest,
	session: Session | null,
) {
    /** Non-Session protected routes must direct to dashboard when trying to access ;
     *  Protecting from accessing public routes is mandatory.  
    */
	if (
        NonProtectedRoutes.some(route => request.nextUrl.pathname.endsWith(route))
	) {
        // If authenticated redirects to dashboard
		if (session)
			return NextResponse.redirect(new URL("/dashboard", request.url))

        // Non authenticated means the user is allowed to publicly access the routes 
        // without any restriction
		return NextResponse.next()
	}

	return null
}
