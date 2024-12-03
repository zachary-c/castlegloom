import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
})

export const apiClient = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false
})

export const patchClient = createClient({
    projectId: projectId,
    dataset: 'production',
    apiVersion: apiVersion,
    useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
    token: process.env.PROJECT_API_TOKEN
})
