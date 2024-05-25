import { LoginInputs } from "@src/pages/login"
import axiosInstance from "./axiosInstance"
import { VerifyInput } from "@src/pages/verify"

// Example API call functions

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

interface ValicateAccessCodeReturn {
  success: boolean
}

export const validateAccessCode = async (phoneNumber: string, data: VerifyInput): Promise<ValicateAccessCodeReturn> => {
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

// More API call functions as needed
