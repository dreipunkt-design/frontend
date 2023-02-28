import qs from "qs"

/**
 * Get full Strapi URL from path
 * @param {string} path Path of the URL
 * @returns {string} Full Strapi URL
 */
export function getStrapiURL(path = "") {
  return `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${path}`
}

/**
 * Get full Strapi URL from path
 * @param {string} path Path of the URL
 * @returns {string} Full Strapi URL
 */
export function getMediaURL(path = "") {
  return `${process.env.NEXT_PUBLIC_MEDIA_API_URL}${path}`
}

/**
 * Helper to make GET requests to Strapi API endpoints
 * @param {string} path Path of the API route
 * @param {Object} urlParamsObject URL params object, will be stringified
 * @param {Object} options Options passed to fetch
 * @returns Parsed API call response
 */
export async function fetchAPI(path, urlParamsObject = {}, options = {}) {
  const token = "893b5d51346bdfd5e7f1982fe87088f789ce7dd8e9f38cdd40a060b7efc3731f9dffc085bc4e98ba5a1a6b63e839163b293ef0fc390f259001277b63a9aa8c3d79b4fb7206180c12c1a4c22af670ba64fe4e0909be0ed9cd1fa127b7704ee9a75293f658586ea823a825f8e96555f3eec0de2d1c8f5dd9ef315df549f31dc450"
  // Merge default and user options  
  const mergedOptions = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    },
    ...options,
  }

  // Build request URL
  const queryString = qs.stringify(urlParamsObject)
  const requestUrl = `${getStrapiURL(
    `/api${path}${queryString ? `?${queryString}` : ""}`
  )}`

  // Trigger API call
  const response = await fetch(requestUrl, mergedOptions)

  // Handle response
  if (!response.ok) {
    console.error(response.statusText)
    throw new Error(`An error occured please try again`)
  }
  const data = await response.json()
  return data
}
