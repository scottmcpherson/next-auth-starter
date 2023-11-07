import cookie from 'cookiejs'

async function fetchAPI(
  method: string,
  url: RequestInfo | URL,
  isAuthRequired = true,
  payload?: any,
) {
  let headersAndBody = {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${cookie.get('token')}`,
    },
  } as any
  if (payload) {
    headersAndBody['body'] = JSON.stringify({ ...payload })
  }
  const response = await fetch(url, headersAndBody)

  if (isAuthRequired && response.status === 401) {
    location.href = `/auth/login?redirect=${encodeURI(location.href)}`
  }

  if (!response.ok) {
    const error = new Error('An error occurred while fetching the data.') as any
    error.info = await response.json()
    error.status = response.status
    throw error
  }

  return response.json()
}

export async function createAPI(
  url: RequestInfo | URL,
  payload: any,
  isAuthRequired = true,
) {
  return fetchAPI('POST', url, isAuthRequired, payload)
}

export async function updateAPI(
  url: RequestInfo | URL,
  payload?: any,
  isAuthRequired = true,
) {
  return fetchAPI('PUT', url, isAuthRequired, payload)
}

export async function patchAPI(
  url: RequestInfo | URL,
  payload: any,
  isAuthRequired = true,
) {
  return fetchAPI('PATCH', url, isAuthRequired, payload)
}

export async function getAPI(url: RequestInfo | URL, isAuthRequired = true) {
  return fetchAPI('GET', url, isAuthRequired)
}

export async function deleteAPI(url: RequestInfo | URL, isAuthRequired = true) {
  return fetchAPI('DELETE', url, isAuthRequired)
}

export async function createMutationAPI(
  url: RequestInfo | URL,
  { arg }: { arg: any },
): Promise<any> {
  return createAPI(url, { ...arg })
}

export async function updateMutationAPI(
  url: RequestInfo | URL,
  { arg }: { arg: any },
) {
  await updateAPI(url, { ...arg })
}

export const getAPIUrl = (path: string) => {
  return `${process.env.NEXT_PUBLIC_API_URL}${path}`
}
