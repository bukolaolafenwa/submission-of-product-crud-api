import express, { Request, Response } from "express"
import Product from "../Models/ProductModel"
import cloudinary from '../config/cloudinary';
import { UploadedFile } from 'express-fileupload';
import mongoose from 'mongoose';

// CREATE PRODUCT
export const createProduct = async (req: Request, res: Response) => {
  try {
    const { productName, description, price } = req.body;

    if (!req.files || !req.files.image) {
      return res.status(400).json({ message: 'Image is required' });
    }

    const file = req.files.image as UploadedFile;

    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: 'products',
    });

    const product = await Product.create({
      productName,
      description,
      price,
      imageUrl: result.secure_url,
    });

    res.status(201).json(product);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Get all products
export const getAllProducts = async (_req: Request, res: Response) => {
  const products = await Product.find();
  res.json(products);
};

// Get a single product
export const getASingleProduct = async (req: Request, res: Response) => {
  const product = await Product.findById(req.params.id);

  if (!product) return res.status(404).json({ message: 'Not found' });

  res.json(product);
};


// Update a product
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const id = (req.params.id as string).trim();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid product ID' });
    }

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const updateData: any = { ...req.body };

    // If new image is uploaded
    if (req.files && req.files.image) {
      const file = req.files.image as UploadedFile;

      // Extract public_id from old image URL
      const publicId = product.imageUrl.split('/').pop()?.split('.')[0];

      // Delete old image from Cloudinary
      if (publicId) {
        await cloudinary.uploader.destroy(`products/${publicId}`);
      }

      // Upload new image
      const result = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: 'products',
      });

      updateData.imageUrl = result.secure_url;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    res.status(200).json(updatedProduct);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// export const updateProduct = async (req: Request, res: Response) => {
//   try {
//     const id = (req.params.id as string).trim();
//     const updateData: any = { ...req.body };

//     // If image is included, upload new one
//     if (req.files && req.files.image) {
//       const file = req.files.image as UploadedFile;

//       const result = await cloudinary.uploader.upload(file.tempFilePath, {
//         folder: 'products',
//       });

//       updateData.imageUrl = result.secure_url;
//     }

//     const updatedProduct = await Product.findByIdAndUpdate(
//       id,
//       updateData,
//       { new: true }
//     );

//     res.status(200).json(updatedProduct);
//   } catch (error: any) {
//     res.status(500).json({ error: error.message });
//   }
// };


// Delete a product
export const deleteProduct = async (req: Request, res: Response) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: 'Product deleted' });
};

