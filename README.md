# AWS Rekognition Demo Project

This project demonstrates the use of AWS Rekognition to manage and verify faces in a collection. The core functionalities include adding a new face with an employee ID, checking if a face matches existing entries, and deleting a face from the collection. Prisma is used as the database for managing employee records and face IDs.

## Features

- **Save a New Face `POST /save`:** Add a new face to the AWS Rekognition collection, ensuring that no duplicate employee ID or face exists.
- **Check Match `POST /checkmatch`:** Verify if a given face matches any face in the AWS Rekognition collection.
- **Delete Face `DELETE /delete/:** Remove a face from AWS Rekognition using the associated employee ID.

## Setup Instructions

### Prerequisites

1. **AWS Account**: Ensure you have an AWS account with Rekognition service enabled.
2. **Environment Variables**: Set the following environment variables in a `.env` file:

   - `AWS_ACCESS_KEY_ID`: Your AWS access key.
   - `AWS_SECRET_ACCESS_KEY`: Your AWS secret key.
   - `REKOGNITION_COLLECTION_ID`: The ID of your Rekognition face collection.

3. **Database**: Set up Prisma with a database (e.g., PostgreSQL) to manage employee records.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Labib2003/aws-rekognition-nodejs.git
   cd aws-rekognition-nodejs
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up the environment variables by creating a `.env` file and adding the necessary AWS and Prisma configurations.

4. Run Prisma migrations to set up the database schema:

   ```bash
   npx prisma db push
   ```

5. Start the application:
   ```bash
   npm start
   ```

### Running the Application

Once the application is running, use an API client like Postman to test the following endpoints:

- `POST /save`: Save a new face.
- `POST /checkmatch`: Check if a face matches.
- `DELETE /delete/:id`: Delete a face by employee ID.

## Error Handling

- **409 Conflict**: Returned when there are conflicts such as duplicate employee IDs or faces.
- **404 Not Found**: Returned when resources (faces or employee IDs) are not found.
- **500 Internal Server Error**: Returned for any unhandled errors.

## Technologies Used

- **Express**: Web framework for API routing.
- **Prisma**: ORM for managing the database.
- **AWS Rekognition**: For face detection and recognition.
