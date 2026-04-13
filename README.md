# Product CRUD API

A RESTful backend API built with Node.js, Express, TypeScript, MongoDB, and Cloudinary for managing products with image uploads.

## Features

* Create product with image upload
* Update product (including image replacement)
* Delete product (with image cleanup)
* Cloudinary integration for image storage

## Tech Stack

* Node.js
* Express
* TypeScript
* MongoDB (Mongoose)
* Cloudinary

## API Endpoints

POST /api/products → Create product
PATCH /api/products/:id → Update product
DELETE /api/products/:id → Delete product
GET /api/products → Get all products
GET /api/products/:id → Get single product

## Getting Started

### Install dependencies

npm install

### Run development server

npm run dev

## Environment Variables

Create a `.env` file and add:

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
MONGO_URI=your_mongodb_uri

## Example Request (Create Product)

Use form-data:

* productName: iPhone 16
* description: Smartphone
* price: 999.99
* image: (upload file)

## Author
Bukola Olafenwa