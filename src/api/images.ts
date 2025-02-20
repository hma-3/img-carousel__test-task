import type { Image } from '@/types/images'
import { client } from '@/utils/http'

interface IGetListImages {
  page?: number
  limit?: number
}

export const getListImages = async ({ page, limit }: IGetListImages) => {
  try {
    const params = new URLSearchParams()

    if (page !== undefined) params.append('page', String(page))
    if (limit !== undefined) params.append('limit', String(limit))

    const response = await client.get<Image[]>(`/list${params.toString() ? `?${params}` : ''}`)
    return response.data
  } catch (error) {
    throw new Error(String(error))
  }
}
