import { ScratchGenerationInputs } from "@src/pages/dashboard/services/from-scratch/caption-create"
import { IdeasGenerationInputs } from "@src/pages/dashboard/services/get-inspired"
import { LoginInputs } from "@src/pages/login"
import { VerifyInput } from "@src/pages/verify"
import axiosInstance from "./axiosInstance"

export const createNewAccessCode = async (data: LoginInputs) => {
  try {
    const response = await axiosInstance.post("/create-new-access-code", {
      phoneNumber: data.phonePrefix + data.phoneNumber,
    })
    return response.data
  } catch (error) {
    console.error("Error fetching example data:", error)
    throw error
  }
}

interface CommonResponse {
  success: boolean
}

export const validateAccessCode = async (phoneNumber: string, data: VerifyInput): Promise<CommonResponse> => {
  try {
    const response = await axiosInstance.post("/validate-access-code", {
      phoneNumber,
      accessCode: data.accessCode,
    })
    return response.data
  } catch (error) {
    console.error("Error posting example data:", error)
    throw error
  }
}

export const generatePostCaptions = async (data: ScratchGenerationInputs): Promise<string[]> => {
  try {
    const response = await axiosInstance.post("/generate-post-captions", data)
    return response.data
  } catch (error) {
    console.error("Error posting example data:", error)
    throw error
  }
}

interface SaveGeneratedContentInputs {
  phoneNumber: string
  topic: string
  data: string
}

interface SaveGeneratedContentData extends CommonResponse {
  captionId: string
}

export const saveGeneratedContent = async (data: SaveGeneratedContentInputs): Promise<SaveGeneratedContentData> => {
  try {
    const response = await axiosInstance.post("/save-generated-content", data)
    return response.data
  } catch (error) {
    console.error("Error posting example data:", error)
    throw error
  }
}

interface UnsaveContentInputs {
  captionId: string
}

export const unsaveContent = async (data: UnsaveContentInputs): Promise<CommonResponse> => {
  try {
    const response = await axiosInstance.post("/unsave-content", data)
    return response.data
  } catch (error) {
    console.error("Error posting example data:", error)
    throw error
  }
}

export const getPostIdeas = async (data: IdeasGenerationInputs): Promise<string[]> => {
  try {
    const response = await axiosInstance.post("/get-post-ideas", data)
    return response.data
  } catch (error) {
    console.error("Error posting example data:", error)
    throw error
  }
}

interface CaptionsFromIdeasInput {
  idea: string
}

export const createCaptionsFromIdeas = async (data: CaptionsFromIdeasInput): Promise<string[]> => {
  try {
    const response = await axiosInstance.post("/create-captions-from-ideas", data)
    return response.data
  } catch (error) {
    console.error("Error posting example data:", error)
    throw error
  }
}

interface GetUserGeneratedContentsInputs {
  phoneNumber: string
}

interface GeneratedContent {
  id: string
  topic: string
  data: string
}

export const getUserGeneratedContents = async (data: GetUserGeneratedContentsInputs): Promise<GeneratedContent[]> => {
  try {
    const response = await axiosInstance.get(`/get-user-generated-contents/${data.phoneNumber}`)
    return response.data
  } catch (error) {
    console.error("Error posting example data:", error)
    throw error
  }
}
