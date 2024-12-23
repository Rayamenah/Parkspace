# Parkspace

## Overview

This repository contains the source code for **Parkspace**, a full-stack vehicle parking application designed to make parking and valet services more convenient. The application includes:

1. **User Application**: Users can locate available parking spaces in a selected location, request valet services, and manage their parking history.
2. **Valet Portal**: Valets can mangage bookings and vehicles assigned to them and monitor pick up and drop off times.
3. **Manager Portal**: Parking space managers can oversee valet operations and manage parking space details.
4. **Admin Dashboard**: Admins supervise managers, monitor parking spaces, and ensure the smooth operation of the platform.

## Features

### User Application

- **Interactive Map**: Find available parking spaces based on location in real-time.
- **Valet Service**: Schedule valet pick-up and drop-off for vehicles.
- **Parking History**: View and manage previous parking records.

### Manager Portal

- **Valet Management**: Add, edit, and manage valet details.
- **Parking Space Analytics**: Monitor space usage and performance metrics.
- **Reservation Management**: Oversee parking reservations.

### Admin Dashboard

- **Manager Supervision**: Add, manage, and track manager activities.
- **System Monitoring**: Track overall system health and operations.
- **Data Insights**: Analyze parking and valet data for optimization.

## Monorepo Structure

Parkspace is structured as a monorepo with the following projects:

- **api**: The backend application built with NestJS and GraphQL (running on port `3000`).
- **web**: The main user-facing application built with Next.js (running on port `3001`).
- **web-valet**: The valet-specific application for handling valet tasks (running on port `3003`).
- **web-manager**: The manager portal for parking space management (running on port `3002`).
- **web-admin**: The admin dashboard for supervising managers and parking spaces (running on port `3004`).

## Technologies Used

- **Frontend**: [Next.js](https://nextjs.org/)
- **Backend**: [NestJS](https://nestjs.com/)
- **API**: GraphQL
- **Database**: PostgreSQL
- **Styling**: Tailwind CSS
- **Authentication**: JWT (JSON Web Tokens)
- **Deployment**: Docker

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js (>= 16.x)
- Docker
- PostgreSQL

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/rayamenah/parkspace.git
   cd parkspace
   ```

2. Install dependencies for the monorepo:

   ```bash
   yarn install
   ```

3. Set up environment variables:

   - Create `.env` files for each project (`api`, `web`, `web-valet`, `web-manager`, `web-admin`).
   - Refer to `.env.example` in each directory for the required environment variables.

4. Run the applications:

   ```bash
   # Start the backend server
   cd apps/api
   yarn start:dev

   # Start the user application
   cd apps/web
   yarn run dev

   # Start the valet application
   cd apps/web-valet
    yarn run dev

   # Start the manager portal
   cd apps/web-manager
   yarn run dev

   # Start the admin dashboard
   cd apps/web-admin
   yarn run dev
   ```

5. Access the applications:

   - **User Application**: `http://localhost:3001`
   - **Valet Application**: `http://localhost:3003`
   - **Manager Portal**: `http://localhost:3002`
   - **Admin Dashboard**: `http://localhost:3004`
   - **API**: `http://localhost:3000`

### Docker Deployment

1. Build and start the Docker containers:

   ```bash
   docker-compose up --build
   ```

2. Access the services:

   - Frontend: `http://localhost`
   - Backend: `http://localhost:3000/graphql`

## GraphQL API

The backend provides a GraphQL API for querying and managing data. Access the GraphQL playground at `http://localhost:3000/graphql`.

### Example Queries

#### Get Available Parking Spaces

```graphql
query SearchGarages(
  $dateFilter: DateFilterInput!
  $locationFilter: LocationFilterInput!
  $slotsFilter: SlotWhereInput
  $garageFilter: GarageFilter
) {
  searchGarages(
    dateFilter: $dateFilter
    locationFilter: $locationFilter
    slotsFilter: $slotsFilter
    garageFilter: $garageFilter
  ) {
    id
    address {
      lat
      lng
      address
    }
    images
    displayName
    availableSlots(dateFilter: $dateFilter, slotsFilter: $slotsFilter) {
      type
      pricePerHour
      count
    }
    verification {
      verified
    }
  }
}
```

#### Create Valet Request

```graphql
mutation createBookingTimeline(
  $createBookingTimelineInput: CreateBookingTimelineInput!
) {
  createBookingTimeline(
    createBookingTimelineInput: $createBookingTimelineInput
  ) {
    bookingId
    id
    managerId
    status
    timestamp
  }
}
```

## Contributing

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature-name`.
3. Commit your changes: `git commit -m 'Add feature-name'`.
4. Push to the branch: `git push origin feature-name`.
5. Open a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

For inquiries, please contact [[your-email@example.com](mailto\:your-email@example.com)].

