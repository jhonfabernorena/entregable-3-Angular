
# Barnyard and Animal Management Project

This project is a web application developed in Angular and Node.js that allows managing barnyards and animals. Users can create barnyards, add animals to them, and view or delete barnyards and animals.

## Technologies

- **Frontend**: Angular, Angular Material
- **Backend**: Node.js, Express, PostgreSQL
- **Database**: PostgreSQL hosted on Neon (https://neon.tech)

## Requirements

To run this project, you need the following installed:

- **Node.js** (version 16 or higher)
- **Angular CLI** (version 12 or higher)
- **PostgreSQL** (if running locally)

## Installation

### Clone the Repository

```bash
git clone https://github.com/jhonfabernorena/entregable-3-Angular.git
cd entregable-3-angular-main
```

### Backend Configuration

1. Navigate to the backend directory and create a `.env` file in the root directory with the following environment variables:

```bash
POSTGRES_USER="default"
POSTGRES_HOST="ep-cool-morning-a4rsezt6-pooler.us-east-1.aws.neon.tech"
POSTGRES_PASSWORD="rQo0uNzm5DgU"
POSTGRES_DATABASE="verceldb"
```

2. Install backend dependencies:

```bash
cd backend
npm install
```

3. Run the database migrations (if using tools like Sequelize or TypeORM):

```bash
npm run migrate
```

4. Start the server:

```bash
npm start
```

The server will be available at `http://localhost:3000`.

### Frontend Configuration

1. Navigate to the frontend directory and run the following commands to install the dependencies:

```bash
cd frontend
npm install
```

2. Start the development server:

```bash
ng serve
```

The frontend application will be available at `http://localhost:4200`.

## Backend Endpoints

### Barnyards

- **Get all barnyards**: `GET /barnyards`
- **Get animals of a barnyard**: `GET /barnyards/:id/animals`
- **Create a new barnyard**: `POST /barnyards`
- **Delete a barnyard**: `DELETE /barnyards/:id`

### Animals

- **Get all animals**: `GET /animals`
- **Add a new animal to a barnyard**: `POST /barnyards/:id/animals`

## Usage

1. **Create a new barnyard**: Go to the frontend and select "Create Barnyard". Fill in the form and save the barnyard.

2. **View animals in a barnyard**: Select a barnyard to view the list of animals assigned to that barnyard.

3. **Add an animal to a barnyard**: Use the form to add a new animal, considering the compatibility restrictions between animals.

4. **Delete barnyard**: Use the delete button in each barnyard.

## Environment Variables

- **POSTGRES_USER**: PostgreSQL user (default is `"default"`).
- **POSTGRES_HOST**: Database host, provided by Neon.
- **POSTGRES_PASSWORD**: Password to connect to the database.
- **POSTGRES_DATABASE**: Name of the database.

## Database

The project uses a PostgreSQL database hosted on Neon. If you want to run the database locally, make sure to have PostgreSQL installed and configure the appropriate environment variables in the `.env` file.

## Contribution

If you'd like to contribute to this project, follow the steps below:

1. Fork the project.
2. Create a new branch (`git checkout -b feature/new-feature`).
3. Make your changes and commit them (`git commit -m 'Add new feature'`).
4. Push your changes to the branch (`git push origin feature/new-feature`).
5. Open a Pull Request.

## License

This project is licensed under the MIT License. You can see more details in the [LICENSE](LICENSE) file.
