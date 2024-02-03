// import asyncHandler from "../utils/asyncHandler.js";
// import { ApiError } from "../utils/ApiError.js";
// import { User } from "../models/user.models.js";
// import { uploadOnCloudinary } from "../utils/cloudinary.js";
// import ApiResponse from "../utils/Apiresponse.js";

// const ragisterUser = asyncHandler(async (req, res) => {
//   const { username, fullName, password, email } = req.body;

//   if ([username, fullName, password, email].some((field) => !field || field.trim() === "")) {
//     throw new ApiError(400, "All fields are required");
//   }

//   const existingUser = await User.findOne({
//     $or: [{ username }, { email }],
//   });

//   if (existingUser) {
//     throw new ApiError(409, "User with email or username already exists");
//   }

//   const avatarLocalPath = req.files?.avatar[0]?.path;
//   let coverImageLocalPath;

//   if (
//     req.files &&
//     Array.isArray(req.files.coverImage) &&
//     req.files.coverImage.length > 0
//   ) {
//     coverImageLocalPath = req.files.coverImage[0].path;
//   }

//   if (!avatarLocalPath) {
//     throw new ApiError(400, "Avatar file is required");
//   }

//   try {
//     const avatarUploadResult = await uploadOnCloudinary(avatarLocalPath);
//     if (!avatarUploadResult || !avatarUploadResult.url) {
//       throw new Error("Cloudinary did not return a valid response");
//     }

//     const coverImageUploadResult = coverImageLocalPath ? await uploadOnCloudinary(coverImageLocalPath) : null;
//     const avatar = avatarUploadResult.url;
//     const coverImage = coverImageUploadResult ? coverImageUploadResult.url : "";

//     const newUser = await User.create({
//       fullName,
//       avatar,
//       coverImage,
//       email,
//       password,
//       username: username.toLowerCase(),
//     });

//     const createdUser = await User.findById(newUser._id).select(
//       "-password -refreshToken"
//     );

//     if (!createdUser) {
//       throw new ApiError(500, "Something went wrong while registering the user");
//     }

//     return res.status(201).json(new ApiResponse(200, createdUser, "Registered successfully"));
//   } catch (error) {
//     console.error("Error during user registration:", error);
//     throw new ApiError(500, `User registration failed: ${error.message}`);
//   }
// });

// export { ragisterUser };

// import asyncHandler from "../utils/asyncHandler.js";
// import { ApiError } from "../utils/ApiError.js";
// import { User } from "../models/user.models.js";
// import { uploadOnCloudinary } from "../utils/cloudinary.js";
// import { upload } from "../middlewares/multer.middleware.js";
// import ApiResponse from "../utils/Apiresponse.js";

// const ragisterUser = asyncHandler(async (req, res) => {
//   const { username, fullName, password, email } = req.body;

//   if ([username, fullName, password, email].some((field) => !field || field.trim() === "")) {
//     throw new ApiError(400, "All fields are required");
//   }

//   const existingUser = await User.findOne({
//     $or: [{ username }, { email }],
//   });

//   if (existingUser) {
//     throw new ApiError(409, "User with email or username already exists");
//   }

//   const avatarLocalPath = req.files?.avatar[0]?.path;
//   let coverImageLocalPath;

//   if (
//     req.files &&
//     Array.isArray(req.files.coverImage) &&
//     req.files.coverImage.length > 0
//   ) {
//     coverImageLocalPath = req.files.coverImage[0].path;
//   }

//   if (!avatarLocalPath) {
//     throw new ApiError(400, "Avatar file is required");
//   }

//   const avatar = await uploadOnCloudinary(avatarLocalPath);
//   const coverImage = coverImageLocalPath ? await uploadOnCloudinary(coverImageLocalPath) : null;

//   const newUser = await User.create({
//     fullName,
//     avatar: avatar.url,
//     coverImage: coverImage?.url || "",
//     email,
//     password,
//     username: username.toLowerCase(),
//   });

//   const createdUser = await User.findById(newUser._id).select(
//     "-password -refreshToken"
//   );

//   if (!createdUser) {
//     throw new ApiError(500, "Something went wrong while registering the user");
//   }

//   return res.status(201).json(new ApiResponse(200, createdUser, "Registered successfully"));
// });

// export { ragisterUser };

import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
// import { upload } from "../middlewares/multer.middleware.js";
import ApiResponse from "../utils/Apiresponse.js";

const registerUser = asyncHandler(async (req, res) => {
    const { fullName, email, username, password } = req.body;
    //console.log("email: ", email);
  
    if (
      [fullName, email, username, password].some((field) => field?.trim() === "")
    ) {
      throw new ApiError(400, "All fields are required");
    }
  
    const existedUser = await User.findOne({
      $or: [{ username }, { email }],
    });
  
    if (existedUser) {
      throw new ApiError(409, "User with email or username already exists");
    }
    //console.log(req.files);
  
    const avatarLocalPath = req.files?.avatar[0]?.path;
    //const coverImageLocalPath = req.files?.coverImage[0]?.path;
  
    let coverImageLocalPath;
    if (
      req.files &&
      Array.isArray(req.files.coverImage) &&
      req.files.coverImage.length > 0
    ) {
      coverImageLocalPath = req.files.coverImage[0].path;
    }
  
    if (!avatarLocalPath) {
      throw new ApiError(400, "Avatar file is required");
    }
  
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);
  
    if (!avatar) {
      throw new ApiError(400, "Avatar file is required");
    }
  
    const user = await User.create({
      fullName,
      avatar: avatar.url,
      coverImage: coverImage?.url || "",
      email,
      password,
      username: username.toLowerCase(),
    });
  
    const createdUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );
  
    if (!createdUser) {
      throw new ApiError(500, "Something went wrong while registering the user");
    }
  
    return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered Successfully"));
});
export { registerUser };
// const { fullName, email, username, password } = req.body;
// //console.log("email: ", email);

// if (
//   [fullName, email, username, password].some((field) => field?.trim() === "")
// ) {
//   throw new ApiError(400, "All fields are required");
// }

// const existedUser = await User.findOne({
//   $or: [{ username }, { email }],
// });

// if (existedUser) {
//   throw new ApiError(409, "User with email or username already exists");
// }
// //console.log(req.files);

// const avatarLocalPath = req.files?.avatar[0]?.path;
// //const coverImageLocalPath = req.files?.coverImage[0]?.path;
// if (!avatarLocalPath) {
//   throw new ApiError(400, "Avatar file is required");
// }
// let coverImageLocalPath;
// if (
//   req.files &&
//   Array.isArray(req.files.coverImage) &&
//   req.files.coverImage.length > 0
// ) {
//   coverImageLocalPath = req.files.coverImage[0].path;
// }
// const avatar = await uploadOnCloudinary(avatarLocalPath);
// const coverImage = await uploadOnCloudinary(coverImageLocalPath);
// if (!avatar) {
//   console.error(
//     "Error: Avatar is required, but uploadOnCloudinary returned:",
//     avatar
//   );
//   throw new ApiError(400, "Avatar file is required");
// }

// const user = await User.create({
//   fullName,
//   avatar: avatar.url,
//   coverImage: coverImage?.url || "",
//   email,
//   password,
//   username: username.toLowerCase(),
// });

// const createdUser = await User.findById(user._id).select(
//   "-password -refreshToken"
// );

// if (!createdUser) {
//   throw new ApiError(500, "Something went wrong while registering the user");
// }

// return res
//   .status(201)
//   .json(new ApiResponse(200, createdUser, "User registered Successfully"));
