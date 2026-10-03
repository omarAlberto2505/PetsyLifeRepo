import { ServerError } from "@/types/errors";


export class NotAuthenticatedEndpointError extends ServerError {
  constructor(instance: string, detail: string) {
    super("Session expired", 401, detail, instance, "session_expired");
  }
}

export default async function WithoutAuthenticationFetch(
  url: string | URL | Request,
  options: RequestInit = {},
) {

  const response = await fetch(url, { ...options });

  console.log(url)
  if (!response.ok) {
    throw new ServerError('', response.status, `HTTP error! status: ${response.status}`, url.toString(), '');
  }

  return response;
}
