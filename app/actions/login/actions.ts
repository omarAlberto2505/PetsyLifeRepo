'use server'
import { signIn } from "@/auth";
import { ServerError } from "@/types/errors";
import { AuthError } from "next-auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";


export async function login(formData: FormData){
    try {
        await signIn("credentials", {
            email: formData.get("email"),
            password: formData.get("password"),
            redirectTo: "/dashboard",
        });

        return undefined
    } catch (error) {
         if (isRedirectError(error)) {
            throw error; // Rethrow it so the redirect actually happens!
        }
        
        if(error instanceof AuthError){
            switch(error.type){
                case "OAuthSignInError":
                    return (error as ServerError).ToJson()
                default:       
                    return new ServerError(
                        "Authentication error",
                        400,
                        error.message,
                        "/api/Auth/Login",
                        `uncaught_error-${Date.now().toLocaleString()}`
                    ).ToJson()
            }
        }

        return new ServerError(
            "Uncaught error",
            400,
            "The application was not able to sort out the error",
            "/api/Auth/Login",
            `uncaught_error-${Date.now().toLocaleString()}`
        ).ToJson()
    }
}