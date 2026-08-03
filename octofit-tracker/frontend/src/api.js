const codespaceName = import.meta.env.VITE_CODESPACE_NAME

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

export const apiEnvironment = codespaceName
  ? `Codespaces: ${codespaceName}`
  : 'Localhost fallback'

export function endpointFor(resource) {
  return `${apiBaseUrl}/${resource}/`
}

export function normalizeApiResponse(payload, resource) {
  if (Array.isArray(payload)) {
    return { items: payload, pagination: null }
  }

  const itemCollections = [
    payload?.items,
    payload?.results,
    payload?.data,
    payload?.docs,
    payload?.records,
    payload?.[resource],
  ]
  const items = itemCollections.find(Array.isArray) ?? []
  const pagination = {
    count: payload?.count ?? payload?.total ?? payload?.totalDocs ?? items.length,
    page: payload?.page ?? payload?.currentPage ?? null,
    pages: payload?.pages ?? payload?.totalPages ?? null,
  }

  return { items, pagination }
}

export async function fetchResource(resource) {
  const response = await fetch(endpointFor(resource))

  if (!response.ok) {
    throw new Error(`Request failed with ${response.status}`)
  }

  return normalizeApiResponse(await response.json(), resource)
}